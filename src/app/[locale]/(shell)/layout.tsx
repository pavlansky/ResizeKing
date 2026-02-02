import { ReactNode } from 'react';
import AppShellClient from '@/components/layout/AppShellClient';

export default function ShellLayout({ children }: { children: ReactNode }) {
  return <AppShellClient>{children}</AppShellClient>;
}
