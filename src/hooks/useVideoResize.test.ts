import { describe, test, expect } from '@jest/globals';

import { initialState, resizeReducer, ResizeState } from '@/hooks/useVideoResize';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

jest.mock('@ffmpeg/ffmpeg', () => ({}));
jest.mock('@ffmpeg/util', () => ({}));

describe('resizeReducer', () => {
  test('start with empty file + idle job', () => {
    expect(initialState.fileDrop.status).toBe('not-selected');
    expect(initialState.fileDrop.file).toBe(null);
    expect(initialState.job.status).toBe('idle');
    expect(initialState.job.progress).toBe(0);
  });

  test('select a video file', () => {
    const file = new File(['fake-video'], 'movie.mp4', {
      type: 'video/mp4',
    });
    const reduceState = resizeReducer(initialState, {
      type: 'SELECT_FILE',
      payload: file,
    });

    expect(reduceState.fileDrop.status).toBe('selected');
    expect(reduceState.fileDrop.file).toBe(file);
    expect(reduceState.fileDrop.error).toBeNull();
  });

  test('select file error', () => {
    const reducerState = resizeReducer(initialState, {
      type: 'SELECT_FILE_ERROR',
      payload: { error: 'Error' },
    });

    expect(reducerState.fileDrop.status).toBe('error');
    expect(reducerState.fileDrop.file).toBeNull();
    expect(reducerState.fileDrop.error).toBe('Error');
  });

  test('move to next step', () => {
    const reducerState = resizeReducer(initialState, {
      type: 'SET_NEXT_STEP',
      payload: { nextStep: 1 },
    });

    expect(reducerState.currentStep).toBe(1);
  });

  test('move to previous step', () => {
    const reducerState = resizeReducer(initialState, {
      type: 'SET_PREV_STEP',
      payload: { prevStep: 0 },
    });

    expect(reducerState.currentStep).toBe(0);
  });

  test('enable watermark', () => {
    const reducerState = resizeReducer(initialState, {
      type: 'SET_WATERMARK_ENABLED',
      payload: true,
    });

    expect(reducerState.options.watermarkEnabled).toBe(true);
  });

  test('set watermark text', () => {
    const activeState = {
      ...initialState,
      options: {
        ...initialState.options,
        watermarkEnabled: true,
      },
    };

    const reducerState = resizeReducer(activeState, {
      type: 'SET_WATERMARK_TEXT',
      payload: 'nice watermark',
    });

    expect(reducerState.options.watermarkEnabled).toBe(true);
    expect(reducerState.options.watermark).toBe('nice watermark');
    expect(reducerState.options.error).toBeNull();
  });

  test('adding watermark failed', () => {
    const reducerState = resizeReducer(initialState, {
      type: 'SET_WATERMARK_ERROR',
      payload: 'oopsie this is an error',
    });

    expect(reducerState.options.error).toBe('oopsie this is an error');
  });

  test('ongoing job progress', () => {
    const activeState = {
      ...initialState,
      job: {
        status: 'processing' as const,
        progress: 0.5,
        outputURL: null,
        error: null,
      },
    };

    const reducerState = resizeReducer(activeState, {
      type: 'JOB_PROGRESS',
      payload: 0.6,
    });

    expect(reducerState.job.progress).toBe(0.6);
  });

  test('starting processing job', () => {
    const currentState = {
      ...initialState,
      job: {
        status: 'error' as const,
        progress: 0.5,
        outputURL: null,
        error: 'something went wrong',
      },
    };
    const reducerState = resizeReducer(currentState, {
      type: 'JOB_START',
    });

    expect(reducerState.job.status).toBe('processing');
    expect(reducerState.job.progress).toBe(0);
    expect(reducerState.job.outputURL).toBeNull();
    expect(reducerState.job.error).toBeNull();
  });

  test('sucessful processing job', () => {
    const currentState = {
      ...initialState,
      job: {
        status: 'processing' as const,
        progress: 0.9,
        outputURL: null,
        error: null,
      },
    };

    const reducerState = resizeReducer(currentState, {
      type: 'JOB_SUCCESS',
      payload: { outputURL: 'my-video.mp4' },
    });

    expect(reducerState.job.status).toBe('Completed');
    expect(reducerState.job.progress).toBe(1);
    expect(reducerState.job.outputURL).toBe('my-video.mp4');
    expect(reducerState.job.error).toBeNull();
  });

  test('processiong error', () => {
    const reducerState = resizeReducer(initialState, {
      type: 'JOB_ERROR',
      payload: { error: 'oopsie this is an error' },
    });

    expect(reducerState.job.status).toBe('error');
    expect(reducerState.job.error).toBe('oopsie this is an error');
  });

  test('reset reducer state', () => {
    const currentState: ResizeState = {
      ...initialState,
      fileDrop: {
        status: 'selected',
        file: new File(['video'], 'video.mp4', { type: 'video/mp4' }),
        error: null,
      },
      job: {
        status: 'idle',
        progress: 0,
        outputURL: null,
        error: null,
      },
      currentStep: 1,
      options: {
        watermarkEnabled: true,
        watermark: 'nice watermark',
        error: null,
      },
    };

    const reducerState = resizeReducer(currentState, {
      type: 'RESET',
    });

    expect(reducerState).toEqual(initialState);
  });
});
