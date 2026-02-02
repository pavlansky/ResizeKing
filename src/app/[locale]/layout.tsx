import '@mantine/core/styles.css';
import './globals.css';
import { routing } from '@/i18n/routing';
import { hasLocale, Locale } from 'use-intl';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { createTheme, DirectionProvider, MantineProvider } from '@mantine/core';

import {
  satoshi,
  inter,
  notoArabic,
  bricolage,
  unbounded,
  notoJP,
  notoSC,
  notoTC,
  notoDeva,
} from '@/fonts/fonts';
import { Metadata } from 'next';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LayoutProps<'/[locale]'>, 'children'>,
): Promise<Metadata> {
  const { locale } = await props.params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: 'GeneralMetadata',
  });

  return {
    title: t('title'),
  };
}

// MANTINE theme
const theme = createTheme({
  // body text
  fontFamily:
    'var(--font-satoshi), ' +
    'var(--font-inter), ' +
    'var(--font-noto-arabic), ' +
    'var(--font-noto-jp), ' +
    'var(--font-noto-sc), ' +
    'var(--font-noto-tc), ' +
    'var(--font-noto-devanagari), ' +
    'apple-system, ' +
    'sans-serif',

  // headings
  headings: {
    fontFamily:
      'var(--font-bricolage), ' +
      'var(--font-unbounded), ' +
      'var(--font-inter),' +
      ' var(--font-noto-arabic),' +
      ' var(--font-noto-jp),' +
      ' var(--font-noto-sc),' +
      ' var(--font-noto-tc),' +
      ' var(--font-noto-devanagari),' +
      ' apple-system,' +
      ' sans-serif',
  },

  breakpoints: {
    xxs: '23.4375em', // 375px
    xs: '36em', // 576px (default)
    sm: '48em', // 768px (default)
    md: '62em', // 992px (default)
    lg: '75em', // 1200px (default)
    xl: '88em', // 1400px (default)
  },
});

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const RTL_LOCALES = ['ar', 'fa', 'ur'];

  const isRTL = RTL_LOCALES.includes(locale);

  return (
    <html
      lang={locale}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <body
        className={`${satoshi.variable} ${inter.variable} ${unbounded.variable} ${notoArabic.variable} ${bricolage.variable} ${notoTC.variable} ${notoSC.variable} ${notoJP.variable} ${notoDeva.variable}`}
      >
        <NextIntlClientProvider>
          <DirectionProvider initialDirection={isRTL ? 'rtl' : 'ltr'}>
            <MantineProvider
              theme={theme}
              defaultColorScheme="dark"
            >
              {children}
            </MantineProvider>
          </DirectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
