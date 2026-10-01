'use client';
import { RingProgress, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

interface RingProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: RingProgressProps) {
  const progress = (currentStep / totalSteps) * 100;
  const isComplete = currentStep === totalSteps;
  const t = useTranslations('ResizeVideoPage.Stepper');

  return (
    <RingProgress
      size={70}
      thickness={7}
      transitionDuration={250}
      roundCaps
      sections={[
        {
          value: progress,
          color: isComplete ? 'orange.6' : 'orange.6',
        },
      ]}
      rootColor="gray.4"
      label={
        <Text
          ta="center"
          size="xs"
          fw={700}
          lh={1.1}
        >
          {currentStep} {t('progress_bar')} {totalSteps}
        </Text>
      }
    ></RingProgress>
  );
}
