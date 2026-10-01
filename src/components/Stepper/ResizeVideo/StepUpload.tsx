import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import { Container, Group, rem, Space, Text } from '@mantine/core';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import { IconDeviceDesktopDown, IconUpload, IconX } from '@tabler/icons-react';
import { useVideoResize } from '@/hooks/useVideoResize';
import { useTranslations } from 'next-intl';
import { StepNotify } from '@/components/Stepper/StepNotify';

type Props = {
  controller: ReturnType<typeof useVideoResize>;
} & Partial<DropzoneProps>;

export default function StepUpload({ controller, ...dropzoneProps }: Props) {
  const t = useTranslations('ResizeVideoPage.Stepper.step_1');
  return (
    <Container px="0">
      <Dropzone
        multiple={false}
        maxFiles={1}
        onDrop={(files) => controller.handleFileDrop(files[0])}
        onReject={(files) => controller.handleFileError(files[0].errors[0].code)}
        maxSize={5 * 1024 ** 2}
        accept={{
          'video/*': [],
        }}
        {...dropzoneProps}
      >
        <Group
          justify="center"
          gap="md"
          style={{ pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              size={52}
              color="var(--mantine-color-blue-6)"
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={52}
              color="var(--mantine-color-red-6)"
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconDeviceDesktopDown
              size={52}
              color="var(--mantine-color-dimmed)"
              stroke={1.5}
            />
          </Dropzone.Idle>

          <Container
            px={0}
            py="sm"
          >
            <Text
              size="lg"
              inline
            >
              {t('content')}
            </Text>
            <Text
              size="sm"
              c="dimmed"
              inline
              mt={rem(14)}
            >
              {t.rich('limit_notice', {
                strong: (chunks) => (
                  <Text
                    inherit
                    component="strong"
                    fw={700}
                  >
                    {chunks}
                  </Text>
                ),
              })}
            </Text>
          </Container>
        </Group>
      </Dropzone>
      <StepNotify
        error_message={controller.state.fileDrop.error}
        success_file_name={controller.state.fileDrop.file?.name ?? null}
      />
    </Container>
  );
}
