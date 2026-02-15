import { Button, ButtonProps, rem } from '@mantine/core';

type NavButtonProps = ButtonProps & {
  label: string;
};

export default function NavButton({ label, ...others }: NavButtonProps) {
  return (
    <Button
      c="white"
      tt="capitalize"
      color="gray"
      fw={500}
      lts={rem(1)}
      fz={{ base: 'sm', md: 'md' }}
      variant="subtle"
      {...others}
    >
      {label}
    </Button>
  );
}
