import {
  Button,
  Center,
  Container,
  Flex,
  Group,
  Loader,
  Progress,
  rem,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useVideoResize } from '@/hooks/useVideoResize';
import { ReactNode, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import {
  IconChevronsRight,
  IconCircleDashedCheck,
  IconDownload,
  IconFaceIdError,
  IconReload,
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

type Props = {
  controller: ReturnType<typeof useVideoResize>;
};

function OuterWrap({ children }: { children: ReactNode }) {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      mih={{ base: rem(280), xs: rem(300), sm: rem(400), lg: rem(500) }}
    >
      {children}
    </Flex>
  );
}

const PROCESSING_STEP_INDEX = 2;

export default function StepProcessing({ controller }: Props) {
  const t = useTranslations('ResizeVideoPage.Processing');
  const { state, handleResizeVideo, handleStartOver, progress, ffmpegStatus } = controller;
  const ffmpegReady = ffmpegStatus === 'ready';
  useEffect(() => {
    if (state.currentStep !== PROCESSING_STEP_INDEX) return;
    if (ffmpegReady && state.job.status === 'idle') {
      void handleResizeVideo();
    }
  }, [state.currentStep, ffmpegReady, state.job.status, handleResizeVideo]);
  const percent = Math.round(progress * 100);
  const isMobile = useMediaQuery('(max-width: 48em)');

  if (!ffmpegReady) {
    return (
      <OuterWrap>
        <Loader
          color="orange"
          size="xl"
          type="dots"
        />
        <Text
          ta="center"
          c="dimmed"
          fw="bold"
        >
          {t('loading')}
        </Text>
      </OuterWrap>
    );
  }

  if (state.job.status === 'error') {
    return (
      <OuterWrap>
        <Flex
          direction="column"
          align="center"
          justify="space-evenly"
          w={{ base: '100%', md: rem(600) }}
          mih={{ base: rem(280), md: rem(300) }}
          styles={{
            root: {
              backgroundColor: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
            },
          }}
        >
          <Title
            order={3}
            c="red.8"
            fz={{ xs: rem(22) }}
          >
            {t('error_title')}
          </Title>
          <Group w={{ base: '100%', xs: '75%' }}>
            <Center
              w={{ base: rem(50), xs: rem(65) }}
              h={{ base: rem(50), xs: rem(65) }}
            >
              <IconFaceIdError
                stroke={2}
                color="red"
                size="100%"
              />
            </Center>
            <Text
              color="red"
              fw="600"
              fz={{ xs: 'lg' }}
            >
              {state.job.error}
            </Text>
          </Group>
          <Button
            variant="filled"
            color="orange.8"
            leftSection={<IconReload stroke={2} />}
            size="md"
            onClick={handleStartOver}
          >
            {t('again_button')}
          </Button>
        </Flex>
      </OuterWrap>
    );
  }

  if (state.job.status === 'Completed' && state.job.outputURL) {
    return (
      <OuterWrap>
        <Flex
          direction="column"
          align="center"
          justify="space-evenly"
          w={{ base: '100%', md: rem(600) }}
          mih={{ base: rem(280), md: rem(350) }}
        >
          <Text
            c="gray.0"
            fw="600"
            fz={{ base: rem(20), sm: rem(24), lg: rem(30) }}
            m="0"
          >
            {t('finished')}
          </Text>
          <IconCircleDashedCheck
            size={isMobile ? '80' : '100'}
            stroke={2}
            color="#00E676"
          />
          <Group
            justify="center"
            gap={isMobile ? 'md' : 'xl'}
          >
            <Button
              component="a"
              download="output.mp4"
              href={state.job.outputURL}
              variant="filled"
              color="orange.8"
              leftSection={<IconDownload stroke={2} />}
              size={isMobile ? 'sm' : 'md'}
            >
              {t('download_button')}
            </Button>
            <Button
              variant="outline"
              onClick={handleStartOver}
              color="orange.8"
              leftSection={<IconChevronsRight stroke={2} />}
              size={isMobile ? 'sm' : 'md'}
            >
              {t('another_button')}
            </Button>
          </Group>
        </Flex>
      </OuterWrap>
    );
  }

  return (
    <OuterWrap>
      <Stack
        w={{ base: '90%', md: rem(600) }}
        bd="1px solid gray.8"
        p={{ base: rem(20), sm: rem(100) }}
        gap="lg"
      >
        <Text
          lts={rem(1)}
          fw="bold"
          ta="center"
          fz={{ xs: rem(20) }}
        >
          {t('processing')}
        </Text>
        <Progress
          radius="lg"
          size="xl"
          value={percent}
          animated
          color="orange"
        />
        <Text
          size="sm"
          c="dimmed"
          ta="right"
          fz={{ xs: rem(20) }}
        >
          {percent}%
        </Text>
      </Stack>
    </OuterWrap>
  );
}
