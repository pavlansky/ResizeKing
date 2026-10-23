import { Center, Container } from '@mantine/core';
import { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';

import '@/app/[locale]/(shell)/page.module.css';
import ComingSoon from '@/components/ComingSoon/ComingSoon';

export default function ResizeImage({ params }: PageProps<'/[locale]/resize-image'>) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  return (
    <Container h="calc(100vh - 95px)">
      <Center h="100%">
        <ComingSoon />
      </Center>
    </Container>
  );
}
