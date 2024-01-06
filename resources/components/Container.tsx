import React, { PropsWithChildren } from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export function Container({
  className,
  children,
}: PropsWithChildren<Props>) {
    return <div className={clsx('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>{children}</div>;
}
