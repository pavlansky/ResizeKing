import { ReactNode } from 'react';
import AppShellClient from '@/components/layout/AppShellClient';
import { FFmpegProvider } from '@/context/FFmpegcontext';

export default function ShellLayout({ children }: { children: ReactNode }) {
  return (
    <FFmpegProvider>
      <AppShellClient>{children}</AppShellClient>
    </FFmpegProvider>
  );
}
