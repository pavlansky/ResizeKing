import { use } from 'react';
import '@/app/[locale]/(shell)/page.module.css';
import { Box, Center, Container, Flex, rem, Stack, Title } from '@mantine/core';
import { Locale, useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { BrandHeading } from '@/components/BrandHeading/BrandHeading';
import StepperResizeVideo from '@/components/Stepper/ResizeVideo/StepperResizeVideo';

export default function ResizeVideo({ params }: PageProps<'/[locale]/resize-video'>) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations('ResizeVideoPage');

  return (
    <Container
      size="responsive"
      maw={{ base: '100%', sm: rem(720), md: rem(960) }}
      px="md"
    >
      <Stack
        w="full"
        gap="md"
      >
        <Flex
          direction="row"
          w="full"
          visibleFrom="sm"
        >
          <Title
            order={1}
            c="gray.1"
          >
            <BrandHeading component="span" />
          </Title>
          <Title
            order={2}
            c="gray.1"
          >
            {t('title')}
          </Title>
        </Flex>
        <Center>
          <Title
            order={3}
            fz={{ base: rem(18) }}
            mt={{ base: 'md' }}
            bg="dark.9"
          >
            {t('subtitle')}
          </Title>
        </Center>
      </Stack>
      <Box>
        <StepperResizeVideo />
      </Box>
    </Container>
  );
}
