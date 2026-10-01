import { Alert, Flex, Grid, rem, Text, Tooltip } from '@mantine/core';
import { useTranslations } from 'next-intl';

type StepNotifyProps = {
  error_message: string | null;
  success_file_name: string | null;
};

export const StepNotify = ({ error_message, success_file_name }: StepNotifyProps) => {
  const t = useTranslations('StepNotifications');

  const sharedAlertProps = {
    variant: 'light',
    py: rem(8),
    lts: rem(0.5),
    styles: {
      root: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      },
    },
  };

  if (!error_message && !success_file_name) return null;
  if (error_message) {
    return (
      <Alert
        color="red"
        {...sharedAlertProps}
      >
        <Flex
          direction={{ base: 'column', xs: 'row' }}
          align="center"
          justify="center"
          lts={rem(0.5)}
        >
          <Text
            size="sm"
            c="red"
            fw="600"
            fz={{ base: rem(14) }}
          >
            {t('error_title')}
          </Text>
          <Text
            size="sm"
            c="red"
            pl={rem(10)}
            style={{
              wordBreak: 'break-all',
            }}
            fz={{ base: rem(12), xs: rem(14) }}
          >
            {error_message}
          </Text>
        </Flex>
      </Alert>
    );
  }
  return (
    <Grid
      justify="center"
      align="center"
      lts={rem(0.5)}
      gutter={rem(6)}
      py={rem(8)}
      bg="var(--mantine-color-green-light)"
      style={{
        borderBottomLeftRadius: 'var(--mantine-radius-sm)',
        borderBottomRightRadius: 'var(--mantine-radius-sm)',
      }}
    >
      <Grid.Col
        span={12}
        ta="center"
      >
        <Text
          size="sm"
          c="green"
          fw="600"
          fz={{ base: rem(14), xs: rem(14) }}
        >
          {t('file_upload_success')}
        </Text>
      </Grid.Col>
      <Grid.Col
        span={9}
        ta="center"
      >
        <Tooltip.Floating label={success_file_name}>
          <Text
            size="sm"
            c="green"
            truncate="end"
            fz={{ base: rem(12), xs: rem(14) }}
          >
            {success_file_name}
          </Text>
        </Tooltip.Floating>
      </Grid.Col>
    </Grid>
  );
};
