import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // List of all locales supported
  locales: ['en', 'sk', 'zh'],

  //used when no locale matches
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/resize-video': {
      sk: '/zmensi-video',
      zh: '/yasuo-shipin',
    },
    '/resize-image': {
      sk: '/zmensi-obrazok',
      zh: '/yasuo-tupian',
    },
    '/about': {
      sk: '/o-projekte',
      zh: '/guanyu',
    },
  },
});
