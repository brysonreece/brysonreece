import React from 'react';
import { AuthenticationCardLogo } from '@/components/AuthenticationCardLogo';
import { Head } from '@inertiajs/react';

interface Props {
  terms: string;
}

export default function TermsOfService({ terms }: Props) {
  return (
    <div className="font-sans text-stone-900 dark:text-stone-100 antialiased">
      <Head title="Terms of Service" />

      <div className="pt-4 bg-stone-100 dark:bg-stone-900">
        <div className="min-h-screen flex flex-col items-center pt-6 sm:pt-0">
          <div>
            <AuthenticationCardLogo />
          </div>

          <div
            className="w-full sm:max-w-2xl mt-6 p-6 bg-white dark:bg-stone-800 shadow-md overflow-hidden sm:rounded-lg prose dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: terms }}
          />
        </div>
      </div>
    </div>
  );
}
