import { ReactNode } from 'react';
import AppShellClient from '@/components/layout/AppShellClient';
import { FFmpegProvider } from '@/context/FFmpegcontext';
import GlobalDropGuard from '@/components/layout/GlobalDropGuard/GlobalDropGuard';

export default function ShellLayout({ children }: { children: ReactNode }) {
  return (
    <FFmpegProvider>
      <GlobalDropGuard />
      <AppShellClient>{children}</AppShellClient>
    </FFmpegProvider>
  );
}
