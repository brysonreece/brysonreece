import React, { PropsWithChildren } from 'react';
import { AuthenticationCardLogo } from '@/components/AuthenticationCardLogo';

export function AuthenticationCard({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-stone-100 dark:bg-stone-900">
      <div>
        <AuthenticationCardLogo />
      </div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white dark:bg-stone-800 shadow-md overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
}
