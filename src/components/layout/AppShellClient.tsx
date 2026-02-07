'use client';

import { ReactNode } from 'react';
import { AppShell, AppShellHeader } from '@mantine/core';
import Footer from '@/components/layout/Footer/Footer';

export default function AppShellClient({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShellHeader withBorder={false}></AppShellHeader>
      <AppShell.Main
        style={{
          minHeight: 'calc(100vh - 35px)',
        }}
      >
        {children}
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}
