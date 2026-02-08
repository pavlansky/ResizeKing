import { forwardRef } from 'react';
import { Title, Text, createPolymorphicComponent, type TitleProps } from '@mantine/core';

const _BrandHeading = forwardRef<HTMLHeadingElement, TitleProps>(function BrandHeading(props, ref) {
  return (
    <Title
      ref={ref}
      {...props}
    >
      Resize-
      <Text
        component="span"
        inherit
        variant="gradient"
        gradient={{
          from: 'rgb(241, 39, 130)',
          to: 'rgb(245, 175, 25)',
          deg: 45,
        }}
      >
        King
      </Text>
    </Title>
  );
});

export const BrandHeading = createPolymorphicComponent<'h1', TitleProps>(_BrandHeading);
