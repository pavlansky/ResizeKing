'use client';

import { createContext, ReactNode, useContext } from 'react';
import { useFFmpeg, UseFFmpegResults } from '@/hooks/useFFmpeg';

const FFmpegContext = createContext<UseFFmpegResults | null>(null);

export function FFmpegProvider({ children }: { children: ReactNode }) {
  const ffmpeg = useFFmpeg();
  return <FFmpegContext.Provider value={ffmpeg}>{children}</FFmpegContext.Provider>;
}

export function useFFmpegConext(): UseFFmpegResults {
  const context = useContext(FFmpegContext);

  if (!context) {
    throw new Error('useFFmpeg must be withing a FFmpegProvider');
  }
  return context;
}
