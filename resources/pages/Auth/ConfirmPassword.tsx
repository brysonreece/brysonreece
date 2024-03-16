import { useForm, Head } from '@inertiajs/react';
import clsx from 'clsx';
import React from 'react';
import { AuthenticationCard } from '@/components/AuthenticationCard';
import { InputError } from '@/components/InputError';
import { InputLabel } from '@/components/InputLabel';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TextInput } from '@/components/TextInput';

export default function ConfirmPassword() {
  const form = useForm({
    password: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    form.post(route('password.confirm'), {
      onFinish: () => form.reset(),
    });
  }

  return (
    <AuthenticationCard>
      <Head title="Secure Area" />

      <div className="mb-4 text-sm text-stone-600 dark:text-stone-400">
        This is a secure area of the application. Please confirm your password
        before continuing.
      </div>

      <form onSubmit={onSubmit}>
        <div>
          <InputLabel htmlFor="password">Password</InputLabel>
          <TextInput
            id="password"
            type="password"
            className="mt-1 block w-full"
            value={form.data.password}
            onChange={e => form.setData('password', e.currentTarget.value)}
            required
            autoComplete="current-password"
            autoFocus
          />
          <InputError className="mt-2" message={form.errors.password} />
        </div>

        <div className="flex justify-end mt-4">
          <PrimaryButton
            className={clsx('ml-4', { 'opacity-25': form.processing })}
            disabled={form.processing}
          >
            Confirm
          </PrimaryButton>
        </div>
      </form>
    </AuthenticationCard>
  );
}
