'use client';

import { ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import Footer from '@/components/layout/Footer/Footer';
import NavigationHeader from '@/components/layout/NavigationHeader/NavigationHeader';

export default function AppShellClient({ children }: { children: ReactNode }) {
  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header withBorder={false}>
        <NavigationHeader />
      </AppShell.Header>
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
