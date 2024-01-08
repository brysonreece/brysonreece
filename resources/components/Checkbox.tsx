import clsx from 'clsx';
import React from 'react';

export function Checkbox(
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) {
  return (
    <input
      type="checkbox"
      {...props}
      className={clsx(
        'rounded dark:bg-stone-900 border-stone-300 dark:border-stone-700 text-blue-600 shadow-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:focus:ring-offset-stone-800',
        props.className,
      )}
    />
  );
}
