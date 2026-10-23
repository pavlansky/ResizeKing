import { ReactNode } from 'react';

import AppShellClient from '@/components/layout/AppShellClient';
import GlobalDropGuard from '@/components/layout/GlobalDropGuard/GlobalDropGuard';
import { FFmpegProvider } from '@/context/FFmpegcontext';

export default function ShellLayout({ children }: { children: ReactNode }) {
  return (
    <FFmpegProvider>
      <GlobalDropGuard />
      <AppShellClient>{children}</AppShellClient>
    </FFmpegProvider>
  );
}
