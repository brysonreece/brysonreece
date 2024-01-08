import { Link } from '@inertiajs/react';
import React, { PropsWithChildren } from 'react';

interface Props {
  as?: string;
  href?: string;
}

export function DropdownLink({
  as,
  href,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div>
      {(() => {
        switch (as) {
          case 'button':
            return (
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm leading-5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus:bg-stone-100 dark:focus:bg-stone-800 transition duration-150 ease-in-out"
              >
                {children}
              </button>
            );
          case 'a':
            return (
              <a
                href={href}
                className="block px-4 py-2 text-sm leading-5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus:bg-stone-100 dark:focus:bg-stone-800 transition duration-150 ease-in-out"
              >
                {children}
              </a>
            );
          default:
            return (
              <Link
                href={href || ''}
                className="block px-4 py-2 text-sm leading-5 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 focus:outline-none focus:bg-stone-100 dark:focus:bg-stone-800 transition duration-150 ease-in-out"
              >
                {children}
              </Link>
            );
        }
      })()}
    </div>
  );
}
