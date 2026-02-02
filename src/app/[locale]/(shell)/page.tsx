import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from 'use-intl';
import { useTranslations } from 'next-intl';
import { Container, Flex, rem, Title, Text } from '@mantine/core';

export default function Home({ params }: PageProps<'/[locale]'>) {
  const { locale } = use(params);

  setRequestLocale(locale as Locale);

  const t = useTranslations('LandingPage');

  return (
    <Container
      size="responsive"
      maw={{ base: '100%', sm: rem(720), lg: rem(960) }}
      style={{ border: '1px solid red' }}
      px="md"
    >
      <Flex
        direction="column"
        align="center"
        gap={{ base: 'lg', xxs: 'lg', sm: 'xl' }}
      >
        <Title
          order={1}
          ta="center"
          fw={900}
          mt={{ base: 'lg', xxs: 'xl' }}
          fz={{ base: rem(32), xxs: rem(42), sm: rem(52), md: rem(64) }}
        >
          Resize-
          <Text
            component="span"
            inherit
            variant="gradient"
            gradient={{
              from: 'rgb(241, 39, 130)',
              to: 'rgb(245, 175, 25)',
              deg: 45,
            }}
          >
            King
          </Text>
        </Title>
      </Flex>
    </Container>
  );
}
