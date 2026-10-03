import type { MetadataRoute } from 'next';

const host = 'https://www.resizeking.com';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${host}/en`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${host}/en`,
          sk: `${host}/sk`,
        },
      },
    },
    {
      url: `${host}/sk`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${host}/en`,
          sk: `${host}/sk`,
        },
      },
    },

    {
      url: `${host}/en/about`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${host}/en/about`,
          sk: `${host}/sk/o-projekte`,
        },
      },
    },
    {
      url: `${host}/sk/o-projekte`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${host}/en/about`,
          sk: `${host}/sk/o-projekte`,
        },
      },
    },

    {
      url: `${host}/en/resize-video`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${host}/en/resize-video`,
          sk: `${host}/sk/zmensi-video`,
        },
      },
    },
    {
      url: `${host}/sk/zmensi-video`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${host}/en/resize-video`,
          sk: `${host}/sk/zmensi-video`,
        },
      },
    },
    {
      url: `${host}/en/resize-image`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${host}/en/resize-image`,
          sk: `${host}/sk/zmensi-obrazok`,
        },
      },
    },
    {
      url: `${host}/sk/zmensi-obrazok`,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${host}/en/resize-image`,
          sk: `${host}/sk/zmensi-obrazok`,
        },
      },
    },
  ];
}
