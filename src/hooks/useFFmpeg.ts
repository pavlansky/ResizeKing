import { FFmpeg } from '@ffmpeg/ffmpeg';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toBlobURL } from '@ffmpeg/util';
import { useTranslations } from 'next-intl';

const CORE_BASE_URL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core-mt@0.12.10/dist/umd';
//more threads than 11 cause silent hangs or RuntimeError: indirect call signature mismatch
const MAX_THREADS = 9;

function getThreadCount(): number {
  const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : undefined;
  return Math.min(MAX_THREADS, Math.max(1, (cores || 2) - 1));
}

export interface UseFFmpegResults {
  loaded: boolean;
  loading: boolean;
  log: string;
  progress: number;
  error: Error | null;
  threadCount: number;
  load: () => Promise<void>;
  exec: (args: string[]) => Promise<number>;
  writeFile: (name: string, data: Uint8Array | string) => Promise<boolean>;
  readFile: (name: string) => Promise<Uint8Array | string>;
  deleteFile: (name: string) => Promise<boolean>;
  resetProgress: () => void;
}

function sanitizeProgress(current: number, incoming: number) {
  const isPlausible = incoming >= 0 && incoming <= 1;
  return isPlausible && incoming > current ? incoming : current;
}

export function useFFmpeg(): UseFFmpegResults {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const t = useTranslations('FFmpeg');

  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState('');
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);
  const [threadCount] = useState<number>(getThreadCount);

  const getInstance = useCallback((): FFmpeg => {
    if (!ffmpegRef.current) {
      ffmpegRef.current = new FFmpeg();
    }
    return ffmpegRef.current;
  }, []);

  const load = useCallback(async (): Promise<void> => {
    if (loaded || loading) return;
    setLoading(true);
    setError(null);

    try {
      const ffmpeg = getInstance();

      ffmpeg.on('log', ({ message }) => setLog(message));
      ffmpeg.on('progress', ({ progress: rawProgress }) => {
        setProgress((current) => sanitizeProgress(current, rawProgress));
      });

      await ffmpeg.load({
        coreURL: await toBlobURL(`${CORE_BASE_URL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${CORE_BASE_URL}/ffmpeg-core.wasm`, 'application/wasm'),
        workerURL: await toBlobURL(`${CORE_BASE_URL}/ffmpeg-core.worker.js`, 'text/javascript'),
      });

      setLoaded(true);
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setLoading(false);
    }
  }, [loaded, loading, getInstance]);

  const exec = useCallback(
    async (args: string[]): Promise<number> => {
      if (!loaded) throw new Error(t('not_loaded'));
      return getInstance().exec(args);
    },
    [loaded, getInstance, t],
  );

  const writeFile = useCallback(
    (name: string, data: Uint8Array | string) => getInstance().writeFile(name, data),
    [getInstance],
  );

  const readFile = useCallback((name: string) => getInstance().readFile(name), [getInstance]);

  const deleteFile = useCallback((name: string) => getInstance().deleteFile(name), [getInstance]);

  const resetProgress = useCallback(() => {
    setProgress(0);
  }, []);

  useEffect(() => {
    return () => {
      ffmpegRef.current?.terminate();
      ffmpegRef.current = null;
    };
  }, []);

  return {
    loaded,
    loading,
    log,
    progress,
    error,
    threadCount,
    load,
    exec,
    writeFile,
    readFile,
    deleteFile,
    resetProgress,
  };
}
