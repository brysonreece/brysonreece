import React from 'react';
import { AuthenticationCardLogo } from '@/components/AuthenticationCardLogo';
import { Head } from '@inertiajs/react';

interface Props {
  policy: string;
}

export default function PrivacyPolicy({ policy }: Props) {
  return (
    <div>
      <Head title="Privacy Policy" />

      <div className="font-sans text-stone-900 dark:text-stone-100 antialiased">
        <div className="pt-4 bg-stone-100 dark:bg-stone-900">
          <div className="min-h-screen flex flex-col items-center pt-6 sm:pt-0">
            <div>
              <AuthenticationCardLogo />
            </div>

            <div
              className="w-full sm:max-w-2xl mt-6 p-6 bg-white dark:bg-stone-800 shadow-md overflow-hidden sm:rounded-lg prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: policy }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
