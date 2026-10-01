import { useVideoResize } from '@/hooks/useVideoResize';
import { Flex, Group, Radio, Stack, TextInput } from '@mantine/core';
import { useTranslations } from 'next-intl';

type Props = {
  controller: ReturnType<typeof useVideoResize>;
};

export default function StepWatermark({ controller }: Props) {
  const t = useTranslations('ResizeVideoPage.Stepper.step_2');
  return (
    <form>
      <Flex
        justify={{ base: 'start', md: 'center' }}
        align="center"
        w={{ base: '100%' }}
      >
        <Stack gap="xl">
          <Radio.Group
            name="useWatermark"
            size="md"
            label={t('watermark')}
            value={controller.state.options.watermarkEnabled ? 'yes' : 'no'}
            onChange={(value) => {
              controller.handleWatermarkToggle(value === 'yes');
            }}
          >
            <Group mt="sm">
              <Radio
                value="yes"
                label={t('option_yes')}
                color="orange.8"
                size="md"
              />
              <Radio
                value="no"
                label={t('option_no')}
                color="orange.8"
                size="md"
              />
            </Group>
          </Radio.Group>

          <TextInput
            size="md"
            label={t('input_label')}
            color="orange.8"
            placeholder={t('input_placeholder')}
            value={controller.state.options.watermark || ''}
            onChange={(event) => controller.handleWatermarkText(event.target.value)}
            error={controller.state.options.error}
            onBlur={() => controller.handleWatermarkChange()}
            disabled={!controller.state.options.watermarkEnabled}
          />
        </Stack>
      </Flex>
    </form>
  );
}
