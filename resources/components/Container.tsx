import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
}

const maxWidths = {
  'sm': 'max-w-sm',
  'md': 'max-w-md',
  'lg': 'max-w-lg',
  'xl': 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

export function Container({
  className,
  maxWidth = '7xl',
  children,
}: PropsWithChildren<Props>) {

    return <div className={clsx('mx-auto px-4 sm:px-6 lg:px-8', className, maxWidths[maxWidth])}>{children}</div>;
}
