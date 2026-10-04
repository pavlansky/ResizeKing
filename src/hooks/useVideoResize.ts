import { useReducer } from 'react';
import { useTranslations } from 'next-intl';

import { fetchFile } from '@ffmpeg/util';
import { useFFmpegConext } from '@/context/FFmpegcontext';

type FFmpegStatus = 'idle' | 'loading-ffmpeg' | 'ready' | 'error';
type FileStatus = 'not-selected' | 'selected' | 'error';
type JobStatus = 'idle' | 'processing' | 'Completed' | 'error';

interface ResizeState {
  fileDrop: {
    status: FileStatus;
    file: File | null;
    error: string | null;
  };
  job: {
    status: JobStatus;
    progress: number;
    outputURL: string | null;
    error: string | null;
  };
  currentStep: number;
  options: {
    watermarkEnabled: boolean;
    watermark: string | null;
    error: string | null;
  };
}

const initialState: ResizeState = {
  fileDrop: {
    status: 'not-selected',
    file: null,
    error: null,
  },
  job: {
    status: 'idle',
    progress: 0,
    outputURL: null,
    error: null,
  },
  currentStep: 0,
  options: {
    watermarkEnabled: false,
    watermark: null,
    error: null,
  },
};

type ResizeAction =
  | { type: 'SELECT_FILE'; payload: File }
  | { type: 'SELECT_FILE_ERROR'; payload: { error: string } }
  | { type: 'SELECT_FILE_CLEAR' }
  | { type: 'SET_NEXT_STEP'; payload: { nextStep: number } }
  | { type: 'SET_PREV_STEP'; payload: { prevStep: number } }
  | { type: 'SET_WATERMARK_ENABLED'; payload: boolean }
  | { type: 'SET_WATERMARK_TEXT'; payload: string }
  | { type: 'SET_WATERMARK_ERROR'; payload: string | null }
  | { type: 'JOB_START' }
  | { type: 'JOB_PROGRESS'; payload: number }
  | { type: 'JOB_SUCCESS'; payload: { outputURL: string } }
  | { type: 'JOB_ERROR'; payload: { error: string } }
  | { type: 'RESET' };

function resizeReducer(state: ResizeState, action: ResizeAction): ResizeState {
  switch (action.type) {
    case 'SELECT_FILE':
      return { ...state, fileDrop: { status: 'selected', file: action.payload, error: null } };
    case 'SELECT_FILE_ERROR':
      return { ...state, fileDrop: { status: 'error', file: null, error: action.payload.error } };
    case 'SET_NEXT_STEP':
      return { ...state, currentStep: action.payload.nextStep };
    case 'SET_PREV_STEP':
      return { ...state, currentStep: action.payload.prevStep };
    case 'SET_WATERMARK_ENABLED':
      return {
        ...state,
        options: {
          ...state.options,
          watermarkEnabled: action.payload,
        },
      };
    case 'SET_WATERMARK_TEXT':
      return {
        ...state,
        options: {
          ...state.options,
          watermark: action.payload,
        },
      };
    case 'SET_WATERMARK_ERROR':
      return {
        ...state,
        options: {
          ...state.options,
          error: action.payload,
        },
      };
    case 'JOB_START':
      return {
        ...state,
        job: { status: 'processing', progress: 0, outputURL: null, error: null },
      };
    case 'JOB_PROGRESS':
      return {
        ...state,
        job: { ...state.job, progress: action.payload },
      };
    case 'JOB_SUCCESS':
      return {
        ...state,
        job: { status: 'Completed', progress: 1, outputURL: action.payload.outputURL, error: null },
      };
    case 'JOB_ERROR':
      return {
        ...state,
        job: { ...state.job, status: 'error', error: action.payload.error },
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export const useVideoResize = () => {
  const [state, dispatch] = useReducer(resizeReducer, initialState);
  const t = useTranslations();

  const {
    loaded: ffmpegLoaded,
    loading: ffmpegLoading,
    error: ffmpegError,
    progress: ffmpegProgress,
    threadCount,
    load,
    exec,
    writeFile,
    readFile,
    resetProgress,
  } = useFFmpegConext();

  const ffmpegStatus: FFmpegStatus = ffmpegError
    ? 'error'
    : ffmpegLoading
      ? 'loading-ffmpeg'
      : ffmpegLoaded
        ? 'ready'
        : 'idle';

  const handleNextStep = () => {
    if (!state.fileDrop.file) return;
    const nextStep = Math.min(state.currentStep + 1, 2);
    dispatch({ type: 'SET_NEXT_STEP', payload: { nextStep } });
  };
  const handlePrevStep = () => {
    const prevStep = Math.max(state.currentStep - 1, 0);
    dispatch({ type: 'SET_PREV_STEP', payload: { prevStep } });
  };

  const handleFileDrop = (file: File) => {
    dispatch({ type: 'SELECT_FILE', payload: file });
    load();
  };

  const handleFileError = (code: string) => {
    if (code === 'file-invalid-type') {
      dispatch({
        type: 'SELECT_FILE_ERROR',
        payload: { error: t('StepNotifications.wrong_file_text') },
      });
      return;
    }
    if (code === 'file-too-large') {
      dispatch({
        type: 'SELECT_FILE_ERROR',
        payload: { error: t('StepNotifications.too_large_file_text') },
      });
    }
  };

  const handleWatermarkToggle = (enabled: boolean) => {
    dispatch({ type: 'SET_WATERMARK_ENABLED', payload: enabled });
    if (!enabled) {
      dispatch({ type: 'SET_WATERMARK_ERROR', payload: null });
    }
  };

  const handleWatermarkText = (value: string) => {
    dispatch({ type: 'SET_WATERMARK_TEXT', payload: value });

    // Fix: If there IS text, clear the error by sending null
    if (value.trim().length > 0) {
      dispatch({ type: 'SET_WATERMARK_ERROR', payload: null });
    }
  };

  const handleWatermarkChange = () => {
    if (!state.options.watermark?.trim()) {
      dispatch({
        type: 'SET_WATERMARK_ERROR',
        payload: t('ResizeVideoPage.Stepper.step_2.watermark_error'),
      });
    }
  };

  const handleResizeVideo = async () => {
    if (!state.fileDrop.file || !ffmpegLoaded) return;
    resetProgress();
    dispatch({ type: 'JOB_START' });

    try {
      const extension = state.fileDrop.file.name.split('.').pop() ?? 'mp4';
      const inputName = `input-${extension}`;

      await writeFile(inputName, await fetchFile(state.fileDrop.file));

      const args = ['-i', inputName];
      if (state.options.watermarkEnabled && state.options.watermark) {
        await writeFile('ArialMdm.ttf', await fetchFile('/fonts/ArialMdm.ttf'));
        await writeFile('watermark.txt', state.options.watermark);
        args.push(
          '-vf',
          'drawtext=fontfile=ArialMdm.ttf:textfile=watermark.txt:x=30:y=30:fontsize=50:fontcolor=white',
        );
      }

      args.push(
        '-c:v',
        'libx264',
        '-crf',
        '20',
        '-preset',
        'superfast',
        '-b:a',
        '198k',
        '-threads',
        String(threadCount),
        'output.mp4',
      );

      await exec(args);

      const data = await readFile('output.mp4');
      const safeData = typeof data === 'string' ? data : new Uint8Array(data);
      const outputURL = URL.createObjectURL(new Blob([safeData], { type: 'video/mp4' }));

      dispatch({ type: 'JOB_SUCCESS', payload: { outputURL } });
    } catch (err) {
      dispatch({
        type: 'JOB_ERROR',
        payload: {
          error:
            err instanceof Error ? err.message : t('ResizeVideoPage.Processing.error_text'),
        },
      });
    }
  };

  const handleStartOver = () => {
    if (state.job.outputURL) {
      URL.revokeObjectURL(state.job.outputURL);
    }
    dispatch({ type: 'RESET' });
  };

  return {
    state,
    dispatch,
    progress: ffmpegProgress,
    ffmpegStatus,
    ffmpegError,
    handleFileError,
    handleFileDrop,
    handleNextStep,
    handlePrevStep,
    handleWatermarkToggle,
    handleWatermarkText,
    handleWatermarkChange,
    handleResizeVideo,
    handleStartOver,
  };
};
