'use client';
import { Container, Flex, rem, Space, Stack, Stepper, Text } from '@mantine/core';
import classes from './StepperResizeVideo.module.css';
import { useVideoResize } from '@/hooks/useVideoResize';
import { useEffect } from 'react';
import { ProgressBar } from '@/components/Stepper/ResizeVideo/ProgressBar';
import { useTranslations } from 'next-intl';
import StepUpload from '@/components/Stepper/ResizeVideo/StepUpload';
import { StepperButton } from '@/components/Stepper/StepperButton';
import StepWatermark from '@/components/Stepper/ResizeVideo/StepWatermark';

export default function StepperResizeVideo() {
  const resizeController = useVideoResize();
  const t = useTranslations('ResizeVideoPage.Stepper');

  useEffect(() => {}, [resizeController.dispatch]);

  const steps = [
    {
      label: t('step_1.label'),
      description: t('step_1.description'),
      content: <StepUpload controller={resizeController} />,
    },
    {
      label: t('step_2.label'),
      description: t('step_2.description'),
      content: <StepWatermark controller={resizeController} />,
    },
  ];

  const activeStep = steps[resizeController.state.currentStep] || steps[0];

  return (
    <Container
      bg="dark.8"
      mt={{ base: 'md' }}
    >
      <Stack gap="sm">
        <Flex
          direction="row"
          px={{ base: 0 }}
          mt={{ base: rem(2) }}
          w="full"
          align="center"
          justify="space-between"
          hiddenFrom="sm"
        >
          <Stack gap="0">
            <Text
              lts={rem(0.8)}
              fw="500"
            >
              {activeStep.label}
            </Text>
            <Text
              c="dimmed"
              size="md"
              lts={rem(0.8)}
            >
              {activeStep.description}
            </Text>
          </Stack>

          <ProgressBar
            currentStep={resizeController.state.currentStep + 1}
            totalSteps={steps.length}
          />
        </Flex>
        <Stepper
          active={resizeController.state.currentStep}
          //CSS to hide default steps on smaller devices
          classNames={{
            steps: classes.steps,
          }}
          color="orange.7"
          mb="xl"
        >
          {steps.map((step, index) => (
            <Stepper.Step
              py={0}
              label={step.label}
              description={step.description}
              key={index}
            >
              {step.content}
            </Stepper.Step>
          ))}
        </Stepper>
      </Stack>
      <Space h="xl"></Space>
      <Flex
        direction="row"
        align="center"
        justify="space-between"
      >
        {resizeController.state.currentStep > 0 && (
          <StepperButton
            variant="light"
            onClick={resizeController.handlePrevStep}
          >
            {'Prev'}
          </StepperButton>
        )}
        <StepperButton
          disabled={!resizeController.state.fileDrop.file}
          onClick={resizeController.handleNextStep}
          variant="filled"
          ml="auto"
        >
          {resizeController.state.currentStep === 1 ? 'Start Processing' : 'Next'}
        </StepperButton>
      </Flex>

      <Space h="lg"></Space>
    </Container>
  );
}
