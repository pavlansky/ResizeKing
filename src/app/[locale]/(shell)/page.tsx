import { use } from 'react';
import './page.module.css';
import { setRequestLocale } from 'next-intl/server';
import { Locale } from 'use-intl';
import { useTranslations } from 'next-intl';
import { Container, Flex, rem, Title, Text, Stack, Alert, SimpleGrid } from '@mantine/core';
import { IconHeart } from '@tabler/icons-react';
import FileTypeCard from '@/components/FileTypeCard/FileTypeCard';
import cardClasses from '@/components/FileTypeCard/FileTypeCard.module.css';
import { Link } from '@/i18n/navigation';

export default function Home({ params }: PageProps<'/[locale]'>) {
  const { locale } = use(params);

  setRequestLocale(locale as Locale);

  const t = useTranslations('LandingPage');

  return (
    <Container
      size="responsive"
      maw={{ base: '100%', sm: rem(720), lg: rem(960) }}
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
        <Stack
          gap={0}
          align="center"
        >
          <Title
            order={2}
            ta="center"
            fw={700}
            fz={{ base: rem(17), xxs: rem(21), sm: rem(25), md: rem(29) }}
          >
            {t('title')}
          </Title>
          <Text
            size="sm"
            fz={{ base: 'sm', xxs: 'md' }}
            fw={500}
            c="dimmed"
            ta="center"
            mt={{ md: rem(4) }}
          >
            {t('subtitle')}
          </Text>
        </Stack>
        <Alert
          icon={<IconHeart />}
          maw={{ base: '100%', sm: rem(576), md: rem(768) }}
          color="rgba(51, 255, 119, 1)"
          styles={{
            root: {
              backgroundColor: 'rgba(51, 255, 119, 0.18)',
              border: '1px solid rgba(51, 255, 119, 0.5)',
            },
          }}
        >
          <Text
            size="sm"
            fz={{ base: 'xs', xxs: 'sm', md: 'md' }}
          >
            {t('trust_note')}
          </Text>
        </Alert>
        <Stack
          w={{ base: '100%', md: rem(650) }}
          align="left"
          gap="lg"
          pb={rem(50)}
          mt={{ base: 'sm', xxs: 'xl' }}
          mx="auto"
        >
          <Text
            fw={600}
            lts="1px"
            size="sm"
            fz={{ base: 'sm', xxs: 'lg', md: 'xl' }}
          >
            {t('select_file_text')}
          </Text>
          <SimpleGrid
            cols={2}
            w="100%"
            spacing={{ base: 'md', xs: rem(50), md: rem(60) }}
          >
            <Link
              href={'/resize-video'}
              style={{ display: 'flex', textDecoration: 'none' }}
            >
              <FileTypeCard
                label={t('compress_video')}
                iconClass={cardClasses.videoIcon}
              />
            </Link>
            <Link
              href={'/resize-image'}
              style={{ display: 'flex', textDecoration: 'none' }}
            >
              <FileTypeCard
                label={t('compress_image')}
                iconClass={cardClasses.imageIcon}
              />
            </Link>
          </SimpleGrid>
        </Stack>
      </Flex>
    </Container>
  );
}
