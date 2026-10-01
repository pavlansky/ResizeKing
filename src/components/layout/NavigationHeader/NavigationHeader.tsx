import { Box, Burger, Container, Divider, Drawer, Group, rem, Stack, Text } from '@mantine/core';
import Logo from '@/components/Logo/Logo';
import { Link } from '@/i18n/navigation';
import NavButton from '@/components/layout/NavigationHeader/NavButton';
import { useTranslations } from 'next-intl';
import { useDisclosure } from '@mantine/hooks';
import LanguagePicker from '@/components/layout/NavigationHeader/LanguagePicker';

export default function NavigationHeader() {
  const t = useTranslations('Navbar');
  const tLangugagePicker = useTranslations('LanguagePicker');
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <Box
      w="100%"
      h="100%"
      bg="dark.9"
    >
      <Container
        size="responsive"
        maw={{ base: '100%', sm: '720px', md: '960px' }}
        px={{ base: 8, xs: 'md' }}
        mx="auto"
        h="100%"
      >
        <Group
          justify="space-between"
          align="center"
          h="100%"
        >
          <Link href="/">
            <Logo height={35} />
          </Link>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="xs"
            size="md"
            color="white"
          />

          <Group
            align="center"
            h="100%"
            visibleFrom="xs"
          >
            <Link href="/">
              <NavButton label={t('home_link')} />
            </Link>
            <Link href="/about">
              <NavButton label={t('about_link')} />
            </Link>
            <Link href="/resize-video">
              <NavButton label={t('video_resize_link')} />
            </Link>
            <LanguagePicker />
          </Group>
        </Group>
      </Container>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        closeButtonProps={{
          size: 'xl',
        }}
        size="100%"
        hiddenFrom="xs"
        padding="md"
        title={<Logo height={35} />}
        styles={{
          header: {
            backgroundColor: 'var(--mantine-color-dark-9)',
          },
          content: {
            backgroundColor: 'var(--mantine-color-dark-9)',
          },
        }}
      >
        <Container w={{ base: '100%', xxs: '80%' }}>
          <Stack
            gap="sm"
            mt="xs"
          >
            <Text
              c="dimmed"
              fw="bold"
              fz="sm"
              lts={rem(0.5)}
            >
              {tLangugagePicker('heading')}
            </Text>
            <LanguagePicker />
          </Stack>
          <Stack
            ta="center"
            mt={rem(45)}
          >
            <Divider size="sm" />
            <Link
              href="/"
              onClick={closeDrawer}
            >
              <NavButton
                label={t('home_link')}
                fz="lg"
              />
            </Link>
            <Divider size="sm" />
            <Link
              href="/about"
              onClick={closeDrawer}
            >
              <NavButton
                label={t('about_link')}
                fz="lg"
              />
            </Link>
            <Divider size="sm" />
          </Stack>
        </Container>
      </Drawer>
    </Box>
  );
}
