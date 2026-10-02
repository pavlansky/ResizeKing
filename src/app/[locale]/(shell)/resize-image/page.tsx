import { use } from 'react';

import { setRequestLocale } from 'next-intl/server';
import { Locale, useTranslations } from 'next-intl';
import '@/app/[locale]/(shell)/page.module.css';
import ComingSoon from '@/components/ComingSoon/ComingSoon';
import { Center, Container } from '@mantine/core';

export default function ResizeImage({ params }: PageProps<'/[locale]/resize-image'>) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations('ResizeImagePage');
  return (
    <Container h="calc(100vh - 95px)">
      <Center h="100%">
        <ComingSoon />
      </Center>
    </Container>
  );
}
