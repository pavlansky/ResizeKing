import '@mantine/core/styles.css';
import './globals.css';
import { routing } from '@/i18n/routing';
import { hasLocale, Locale } from 'use-intl';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { DirectionProvider, MantineProvider } from '@mantine/core';
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
import { theme } from '@/components/MantineTheme/theme';

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
    metadataBase: new URL('https://resizeking.com'),
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      siteName: 'ResizeKing',
      type: 'website',
      locale,
    },
  };
}

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
      className={`${satoshi.variable} ${inter.variable} ${unbounded.variable} ${notoArabic.variable} ${bricolage.variable} ${notoTC.variable} ${notoSC.variable} ${notoJP.variable} ${notoDeva.variable}`}
    >
      <body>
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
