import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // List of all locales supported
  locales: ['en', 'sk', 'zh', 'ar'],

  //used when no locale matches
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/resize-video': {
      sk: '/zmensi-video',
      zh: '/yasuo-shipin',
      ar: '/ضغط-الفيديو',
    },
    '/resize-image': {
      sk: '/zmensi-obrazok',
      zh: '/yasuo-tupian',
      ar: '/ضغط-الصور',
    },
    '/about': {
      sk: '/o-projekte',
      zh: '/guanyu',
      ar: '/عن-الأداة',
    },
  },
});
