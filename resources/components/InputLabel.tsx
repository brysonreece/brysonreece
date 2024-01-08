import React, { PropsWithChildren } from 'react';

interface Props {
  value?: string;
  htmlFor?: string;
}

export function InputLabel({
  value,
  htmlFor,
  children,
}: PropsWithChildren<Props>) {
  return (
    <label
      className="block font-medium text-sm text-stone-700 dark:text-stone-300"
      htmlFor={htmlFor}
    >
      {value || children}
    </label>
  );
}
