import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function SecondaryButton({
  children,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <button
      {...props}
      className={clsx(
        'inline-flex items-center px-4 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-500 rounded-md font-semibold text-xs text-stone-700 dark:text-stone-300 uppercase tracking-widest shadow-sm hover:bg-stone-50 dark:hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-stone-800 disabled:opacity-25 transition ease-in-out duration-150',
        props.className,
      )}
    >
      {children}
    </button>
  );
}
