import { useVideoResize } from '@/hooks/useVideoResize';
import { Group, Input, Radio, Stack, TextInput } from '@mantine/core';

type Props = {
  controller: ReturnType<typeof useVideoResize>;
};

export default function StepWatermark({ controller }: Props) {
  return (
    <form>
      <Stack gap="xl">
        <Radio.Group
          name="useWatermark"
          label=" Do you want to use watermark ? "
          value={controller.state.options.watermarkEnabled ? 'yes' : 'no'}
          onChange={(value) => {
            controller.handleWatermarkToggle(value === 'yes');
          }}
        >
          <Group mt="xs">
            <Radio
              value="yes"
              label="yes"
              color="orange.8"
            />
            <Radio
              value="no"
              label="no"
              color="orange.8"
            />
          </Group>
        </Radio.Group>
        {controller.state.options.watermarkEnabled && (
          <TextInput
            label="Text for watermark:"
            placeholder="Enter watermark text"
            value={controller.state.options.watermark || ''}
          />
        )}
      </Stack>
    </form>
  );
}
