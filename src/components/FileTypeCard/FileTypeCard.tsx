import { Box, Center, Paper, rem, Stack, Text } from '@mantine/core';

import classes from './FileTypeCard.module.css';

interface CardProps {
  label: string;
  iconClass: string;
}

export default function FileTypeCard({ label, iconClass }: CardProps) {
  return (
    <Paper
      radius="md"
      p="xs"
      className={classes.cardPaper}
      style={{ flex: 1 }}
    >
      <Stack
        align="center"
        justify="center"
        h="100%"
        gap="sm"
      >
        <Center
          h={rem(70)}
          w="100%"
        >
          <Box className={`${classes.fileCardStencil} ${iconClass}`} />
        </Center>
        <Text
          size="sm"
          fz={{ base: 'sm', md: 'md' }}
          c="white"
          fw={400}
          tt="capitalize"
          lts={rem(1)}
        >
          {label}
        </Text>
      </Stack>
    </Paper>
  );
}
