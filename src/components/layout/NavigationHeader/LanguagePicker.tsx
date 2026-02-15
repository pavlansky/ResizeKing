'use client';
import 'flag-icons/css/flag-icons.min.css';
import classes from './LanguagePicker.module.css';
import {
  Modal,
  Text,
  SimpleGrid,
  UnstyledButton,
  Group,
  Box,
  Button,
  rem,
  ScrollArea,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { Locale, useLocale, useTranslations } from 'next-intl';

export default function LanguagePicker() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();

  const [isPending, startTransition] = useTransition();
  const [opened, { open, close }] = useDisclosure(false);

  const t = useTranslations('LanguagePicker');
  const locale = useLocale();

  const LOCALE_FLAGS: Record<string, string> = {
    en: 'us',
    sk: 'sk',
  };

  function onSelectChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
    });
  }

  const activeLocaleFirst = [
    locale,
    ...routing.locales
      .filter((lang) => lang !== locale)
      .sort((a, b) => t('locale', { locale: a }).localeCompare(t('locale', { locale: b }))),
  ];

  const phoneWide = useMediaQuery('(min-width: 420px)');
  const isTablet = useMediaQuery('(min-width: 576px)');

  return (
    <>
      <Modal
        fullScreen={!isTablet}
        scrollAreaComponent={ScrollArea.Autosize}
        size="xl"
        opened={opened}
        onClose={close}
        title={
          <Text
            fw={700}
            fz={{ base: 'lg' }}
            lts={1}
            c="gray.0"
          >
            {t('heading')}
          </Text>
        }
        closeButtonProps={{
          size: 'xl',
        }}
        overlayProps={{
          backgroundOpacity: 0.8,
          blur: 3,
        }}
        centered
        styles={{
          content: {
            backgroundColor: 'var(--mantine-color-dark-9)',
            paddingBottom: '1.5rem',
          },
          header: {
            backgroundColor: 'var(--mantine-color-dark-9)',
          },
        }}
      >
        <SimpleGrid
          mt="sm"
          cols={phoneWide ? 2 : 1} //420px variable only for this file
          spacing="xl"
          verticalSpacing="lg"
        >
          {activeLocaleFirst.map((lang) => {
            const isActive = locale === lang;

            return (
              <UnstyledButton
                key={lang}
                onClick={() => onSelectChange(lang as Locale)}
                disabled={isPending}
                bg={isActive ? 'transparent' : 'dark.6'}
                //Classes handle hovering effect
                className={isActive ? classes.activeButton : classes.inactiveButton}
                p="sm"
                style={{
                  border: isActive ? '1px solid white' : '1px solid transparent',
                  transition: 'all 0.4s ease',
                  borderRadius: 'var(--mantine-radius-sm)',
                }}
              >
                <Group gap="sm">
                  <Box
                    component="span"
                    className={`fi fi-${LOCALE_FLAGS[lang]}`}
                  />
                  <Text
                    size="sm"
                    lts={rem(1.5)}
                    fw={500}
                    c="gray.0"
                  >
                    {t('locale', { locale: lang })}
                  </Text>
                </Group>
              </UnstyledButton>
            );
          })}
        </SimpleGrid>
      </Modal>
      <Button
        variant="default"
        onClick={open}
        leftSection={<span className={`fi fi-${LOCALE_FLAGS[locale]}`} />}
        lts={1}
        fw={500}
        bg="dark.7"
        color="gray"
      >
        {t('locale', { locale: locale })}
      </Button>
    </>
  );
}
