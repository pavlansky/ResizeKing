import { Center, Flex, rem, Title } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { IconRocket } from '@tabler/icons-react';

export default function ComingSoon() {
  const t = useTranslations('ResizeImagePage');
  return (
    <Flex
      direction="column"
      align="center"
      bg="#121315"
      p={{ base: rem(12) }}
    >
      <Center
        w={{ base: rem(60), sm: rem(70), md: rem(80), lg: rem(100) }}
        h={{ base: rem(60), sm: rem(70), md: rem(80), lg: rem(100) }}
      >
        <svg
          style={{ width: '100%', height: '100%' }}
          viewBox="0 0 24 24"
        >
          <defs>
            <linearGradient
              id="rocket-grad"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                stopColor="rgb(241, 39, 130)"
              />
              <stop
                offset="100%"
                stopColor="rgb(245, 175, 25)"
              />
            </linearGradient>
          </defs>
          <IconRocket
            stroke={2}
            size="100%"
            color="url(#rocket-grad)"
          />
        </svg>
      </Center>

      <Title
        mt={{ base: rem(10) }}
        order={1}
        fz={{ md: rem(50), lg: rem(70) }}
      >
        {t('title')}
      </Title>
    </Flex>
  );
}
