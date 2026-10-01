import { useReducer } from 'react';
import { useTranslations } from 'next-intl';

type FFmpegStatus = 'idle' | 'loading-ffmpeg' | 'ready' | 'error';
type FileStatus = 'not-selected' | 'selected' | 'error';
type JobStatus = 'idle' | 'processing' | 'Completed' | 'error';

interface ResizeState {
  ffmpeg: {
    status: FFmpegStatus;
    error: string | null;
  };
  fileDrop: {
    status: FileStatus;
    file: File | null;
    error: string | null;
  };
  job: {
    status: JobStatus;
    progress: number;
  };
  currentStep: number;
  options: {
    watermarkEnabled: boolean;
    watermark: string | null;
    error: string | null;
  };
}

const initialState: ResizeState = {
  ffmpeg: {
    status: 'idle',
    error: null,
  },
  fileDrop: {
    status: 'not-selected',
    file: null,
    error: null,
  },
  job: {
    status: 'idle',
    progress: 0,
  },
  currentStep: 0,
  options: {
    watermarkEnabled: false,
    watermark: null,
    error: null,
  },
};

type ResizeAction =
  | { type: 'LOAD_FFMPEG_START' }
  | { type: 'LOAD_FFMPEG_SUCCESS' }
  | { type: 'LOAD_FFMPEG_ERROR'; payload: { error: string } }
  | { type: 'SELECT_FILE'; payload: File }
  | { type: 'SELECT_FILE_ERROR'; payload: { error: string } }
  | { type: 'SELECT_FILE_CLEAR' }
  | { type: 'SET_NEXT_STEP'; payload: { nextStep: number } }
  | { type: 'SET_PREV_STEP'; payload: { prevStep: number } };

function resizeReducer(state: ResizeState, action: ResizeAction): ResizeState {
  switch (action.type) {
    case 'LOAD_FFMPEG_START':
      return { ...state, ffmpeg: { status: 'loading-ffmpeg', error: null } };
    case 'LOAD_FFMPEG_SUCCESS':
      return { ...state, ffmpeg: { status: 'ready', error: null } };
    case 'LOAD_FFMPEG_ERROR':
      return { ...state, ffmpeg: { status: 'error', error: action.payload.error } };

    case 'SELECT_FILE':
      return { ...state, fileDrop: { status: 'selected', file: action.payload, error: null } };
    case 'SELECT_FILE_ERROR':
      return { ...state, fileDrop: { status: 'error', file: null, error: action.payload.error } };
    case 'SET_NEXT_STEP':
      return { ...state, currentStep: action.payload.nextStep };
    case 'SET_PREV_STEP':
      return { ...state, currentStep: action.payload.prevStep };
    default:
      return state;
  }
}

export const useVideoResize = () => {
  const [state, dispatch] = useReducer(resizeReducer, initialState);
  const t = useTranslations('StepNotifications');

  const handleNextStep = () => {
    if (!state.fileDrop.file) return;
    const nextStep = Math.min(state.currentStep + 1, 1);
    dispatch({ type: 'SET_NEXT_STEP', payload: { nextStep } });
  };
  const handlePrevStep = () => {
    const prevStep = Math.max(state.currentStep - 1, 0);
    dispatch({ type: 'SET_PREV_STEP', payload: { prevStep } });
  };

  const handleFileDrop = (file: File) => {
    dispatch({ type: 'SELECT_FILE', payload: file });
  };

  const handleFileError = (code: string) => {
    if (code === 'file-invalid-type') {
      dispatch({
        type: 'SELECT_FILE_ERROR',
        payload: { error: t('wrong_file_text') },
      });
      return;
    }
  };

  return { state, dispatch, handleFileError, handleFileDrop, handleNextStep, handlePrevStep };
};
