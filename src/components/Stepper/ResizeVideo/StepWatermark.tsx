import { useVideoResize } from '@/hooks/useVideoResize';
import { Input, Radio } from '@mantine/core';

type Props = {
  controller: ReturnType<typeof useVideoResize>;
};

export default function StepWatermark(controller: Props) {
  return (
    <form>
      <Input.Wrapper label="Do you want to use watermark ? ">
        <Radio
          color="orange.8"
          label="yes"
        />
        <Radio
          color="orange.8"
          label="no"
        />
      </Input.Wrapper>
    </form>
  );
}
