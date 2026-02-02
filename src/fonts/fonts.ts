import localFont from 'next/font/local';
import {
  Bricolage_Grotesque,
  Inter,
  Noto_Sans_Arabic,
  Unbounded,
  Noto_Sans_JP,
  Noto_Sans_SC,
  Noto_Sans_TC,
  Noto_Sans_Devanagari,
} from 'next/font/google';

export const satoshi = localFont({
  src: [
    { path: './Satoshi-Light.woff2', weight: '400' },
    { path: './Satoshi-Regular.woff2', weight: '500' },
    { path: './Satoshi-Medium.woff2', weight: '600' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
});

//Headings + Text
export const inter = Inter({
  subsets: ['latin-ext', 'cyrillic-ext', 'greek-ext', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

export const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
  display: 'swap',
});

export const notoJP = Noto_Sans_JP({
  variable: '--font-noto-jp',
  display: 'swap',
});

export const notoSC = Noto_Sans_SC({
  variable: '--font-noto-sc',
  display: 'swap',
});

export const notoTC = Noto_Sans_TC({
  variable: '--font-noto-tc',
  display: 'swap',
});

export const notoDeva = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-noto-devanagari',
  display: 'swap',
});

//Headings
export const bricolage = Bricolage_Grotesque({
  subsets: ['latin-ext'],
  variable: '--font-bricolage',
  display: 'swap',
});

export const unbounded = Unbounded({
  subsets: ['cyrillic-ext', 'vietnamese'],
  variable: '--font-unbounded',
  display: 'swap',
});
