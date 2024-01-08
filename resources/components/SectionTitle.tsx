import React from 'react';

interface Props {
  title: string;
  description: string;
}

export function SectionTitle({ title, description }: Props) {
  return (
    <div className="md:col-span-1">
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100">
          {title}
        </h3>

        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          {description}
        </p>
      </div>
    </div>
  );
}
