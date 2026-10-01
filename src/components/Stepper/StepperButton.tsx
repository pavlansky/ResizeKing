import { Button, ButtonProps, rem } from '@mantine/core';

type BtnProps = ButtonProps & {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'light' | 'filled';
  children: React.ReactNode;
};

export const StepperButton = ({
  onClick,
  disabled,
  variant = 'filled',
  children,
  ...props
}: BtnProps) => {
  return (
    <Button
      {...props}
      variant={variant}
      onClick={onClick}
      color="orange.8"
      fw={500}
      disabled={disabled}
      lts={rem(1.2)}
    >
      {children}
    </Button>
  );
};
