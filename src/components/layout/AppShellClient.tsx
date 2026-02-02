'use client';

import { ReactNode } from 'react';
import { AppShell, AppShellHeader } from '@mantine/core';

export default function AppShellClient({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShellHeader withBorder={false}></AppShellHeader>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
