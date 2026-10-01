// MANTINE theme
'use client';
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'orange',
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
      'var(--font-inter), ' +
      'var(--font-noto-arabic), ' +
      'var(--font-noto-jp), ' +
      'var(--font-noto-sc), ' +
      'var(--font-noto-tc), ' +
      'var(--font-noto-devanagari), ' +
      'apple-system, ' +
      'sans-serif',
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
