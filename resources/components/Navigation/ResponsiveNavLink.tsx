import { Link } from '@inertiajs/react';
import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

type Props =
  | {
      as: 'button';
      active?: boolean;
      href?: undefined;
    }
  | {
      active?: boolean;
      href: string;
    };

export function ResponsiveNavLink({
  active,
  href,
  children,
  ...props
}: PropsWithChildren<Props>) {
  const classes = active
    ? 'block w-full pl-3 pr-4 py-2 border-l-4 border-blue-400 dark:border-blue-600 text-left text-base font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/50 focus:outline-none focus:text-blue-800 dark:focus:text-blue-200 focus:bg-blue-100 dark:focus:bg-blue-900 focus:border-blue-700 dark:focus:border-blue-300 transition duration-150 ease-in-out'
    : 'block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700 hover:border-stone-300 dark:hover:border-stone-600 focus:outline-none focus:text-stone-800 dark:focus:text-stone-200 focus:bg-stone-50 dark:focus:bg-stone-700 focus:border-stone-300 dark:focus:border-stone-600 transition duration-150 ease-in-out';

  return (
    <div>
      {'as' in props && props.as === 'button' ? (
        <button className={clsx('w-full text-left', classes)}>
          {children}
        </button>
      ) : (
        <Link href={href || ''} className={classes}>
          {children}
        </Link>
      )}
    </div>
  );
}
