import { Anchor, Box, Group, rem, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');

  const currentYear = new Date().getFullYear();

  return (
    <Box
      w="100%"
      h={rem(35)}
      pos="relative"
    >
      <Group
        justify="center"
        h="100%"
        gap={5}
        bg="dark.9"
      >
        <Text
          size="xs"
          c="dimmed"
        >
          &copy; {currentYear} {t('credits_text')}
        </Text>
        <Anchor
          target="_blank"
          href="https://github.com/Qwertin"
          size="xs"
          c="gray.3"
        >
          Tomáš Pavlanský
        </Anchor>
      </Group>
    </Box>
  );
}
