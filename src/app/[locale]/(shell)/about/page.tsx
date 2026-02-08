import { use } from 'react';
import '@/app/[locale]/(shell)/page.module.css';
import { Container, Flex, rem, Title, Text, Stack, Space } from '@mantine/core';
import { BrandHeading } from '@/components/BrandHeading/BrandHeading';
import { setRequestLocale } from 'next-intl/server';
import { Locale, useTranslations } from 'next-intl';

export default function About({ params }: PageProps<'/[locale]/about'>) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations('AboutPage');

  return (
    <Container
      size="100%"
      px={{ base: 0 }}
    >
      <Flex
        direction="column"
        align="center"
      >
        <Flex
          w="full"
          justify="center"
          mt={{ base: 'md', xs: 'xl', md: rem(50), lg: rem(60) }}
          mb={{ sm: 'sm', xs: 'lg', md: 'xl' }}
        >
          <Title
            order={1}
            fz={{ base: rem(24), xxs: rem(28), xs: rem(36), sm: rem(46), lg: rem(52) }}
            c="gray.1"
            bg={{ sm: 'dark.9' }}
            p={{ base: rem(9) }}
          >
            {t('title')}
            <BrandHeading
              fz={{ base: rem(24), xxs: rem(28), xs: rem(36), sm: rem(46), lg: rem(52) }}
              component="span"
            />
          </Title>
        </Flex>
        <Flex
          direction="column"
          maw={{ base: '100%', sm: '80%', lg: rem(960) }}
          gap={{ base: 'md', sm: 'xl' }}
          px={{ base: 'lg', xxs: 'xl', xs: rem(46), sm: rem(56) }}
          py={{ base: 'xl', sm: rem(50) }}
          mt={{ base: 'md' }}
          bg="dark.9"
        >
          <Text
            ta="justify"
            c="dark.2"
            fz={{ base: 'md', md: 'lg' }}
          >
            {t.rich('paragraph_1', {
              strong: (chunks) => (
                <Text
                  inherit
                  c="gray.1"
                  component="strong"
                >
                  {chunks}
                </Text>
              ),
            })}
          </Text>
          <Text
            ta="justify"
            c="dark.2"
            fz={{ base: 'md', md: 'lg' }}
          >
            {t.rich('paragraph_2', {
              strongbrand: (chunks) => (
                <BrandHeading
                  component="span"
                  c="gray.1"
                  fz={{ base: 'md', md: 'lg' }}
                  style={{ lineHeight: '1rem' }}
                >
                  {chunks}
                </BrandHeading>
              ),
              strong: (chunks) => (
                <Text
                  inherit
                  c="gray.1"
                  component="strong"
                >
                  {chunks}
                </Text>
              ),
            })}
          </Text>
          <Stack mt={{ base: 'md', md: 'lg' }}>
            <Text
              ta="justify"
              c="gray.1"
              fz={{ base: 'md', md: 'lg' }}
            >
              {t('paragraph_3')}
            </Text>

            <Text
              ta="justify"
              c="dark.2"
              fz={{ base: 'md', md: 'lg' }}
            >
              {t.rich('list_text_1', {
                strong: (chunks) => (
                  <Text
                    inherit
                    c="gray.1"
                    component="strong"
                  >
                    {chunks}
                  </Text>
                ),
                green: (chunks) => (
                  <Text
                    inherit
                    c="green"
                    component="strong"
                  >
                    {chunks}
                  </Text>
                ),
              })}
            </Text>
          </Stack>
        </Flex>
      </Flex>
      <Space h={{ base: 'xl' }} />
    </Container>
  );
}
