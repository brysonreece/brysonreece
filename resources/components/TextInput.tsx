import clsx from 'clsx';
import React, { forwardRef } from 'react';

export const TextInput = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={clsx(
      'border-stone-300 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 rounded-md shadow-sm',
      props.className,
    )}
  />
));
