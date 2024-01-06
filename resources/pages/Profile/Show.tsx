import React from 'react';
import { DeleteUserForm } from './Partials/DeleteUserForm';
import { LogoutOtherBrowserSessions } from './Partials/LogoutOtherBrowserSessionsForm';
import { TwoFactorAuthenticationForm } from './Partials/TwoFactorAuthenticationForm';
import { UpdatePasswordForm } from './Partials/UpdatePasswordForm';
import { UpdateProfileInformationForm } from './Partials/UpdateProfileInformationForm';
import useTypedPage from '@/hooks/useTypedPage';
import { SectionBorder } from '@/components/SectionBorder';
import { AppLayout } from '@/layouts/AppLayout';
import { Session } from '@/types';

interface Props {
  sessions: Session[];
  confirmsTwoFactorAuthentication: boolean;
}

export default function Show({
  sessions,
  confirmsTwoFactorAuthentication,
}: Props) {
  const page = useTypedPage();

  return (
    <AppLayout
      title={'Profile'}
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          Profile
        </h2>
      )}
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          {page.props.jetstream.canUpdateProfileInformation ? (
            <div>
              <UpdateProfileInformationForm user={page.props.auth.user!} />

              <SectionBorder />
            </div>
          ) : null}

          {page.props.jetstream.canUpdatePassword ? (
            <div className="mt-10 sm:mt-0">
              <UpdatePasswordForm />

              <SectionBorder />
            </div>
          ) : null}

          {page.props.jetstream.canManageTwoFactorAuthentication ? (
            <div className="mt-10 sm:mt-0">
              <TwoFactorAuthenticationForm
                requiresConfirmation={confirmsTwoFactorAuthentication}
              />

              <SectionBorder />
            </div>
          ) : null}

          <div className="mt-10 sm:mt-0">
            <LogoutOtherBrowserSessions sessions={sessions} />
          </div>

          {page.props.jetstream.hasAccountDeletionFeatures ? (
            <>
              <SectionBorder />

              <div className="mt-10 sm:mt-0">
                <DeleteUserForm />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
}
