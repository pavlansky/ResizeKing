import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from 'use-intl';
import { useTranslations } from 'next-intl';
import { rem, Title } from '@mantine/core';

export default function Home({ params }: PageProps<'/[locale]'>) {
  const { locale } = use(params);

  setRequestLocale(locale as Locale);

  const t = useTranslations('LandingPage');

  return (
    <Title
      order={1}
      fz={rem(50)}
      fw="900"
    >
      ggg
    </Title>
  );
}
