import React from 'react';
import { Welcome } from '@/components/Welcome';
import { AppLayout } from '@/layouts/AppLayout';
import useTypedPage from '@/hooks/useTypedPage';

export default function Dashboard() {
  const name = useTypedPage().props.auth.user!.name.split(' ')[0];

  return (
    <AppLayout
      title="Dashboard"
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-stone-800 dark:text-stone-200 leading-tight">
          Dashboard
        </h2>
      )}
    >
      <div className="sm:py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Welcome />
        </div>
      </div>
    </AppLayout>
  );
}
