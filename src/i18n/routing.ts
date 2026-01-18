import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // List of all locales supported
  locales: ['en', 'sk'],

  //used when no locale matches
  defaultLocale: 'en',
});
