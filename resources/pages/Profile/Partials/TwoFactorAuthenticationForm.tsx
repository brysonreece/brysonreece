import { router } from '@inertiajs/core';
import { useForm } from '@inertiajs/react';
import axios from 'axios';
import clsx from 'clsx';
import React, { useState } from 'react';
import { ActionSection } from '@/components/ActionSection';
import { ConfirmsPassword } from '@/components/ConfirmsPassword';
import { DangerButton } from '@/components/DangerButton';
import { InputError } from '@/components/InputError';
import { InputLabel } from '@/components/InputLabel';
import { PrimaryButton } from '@/components/PrimaryButton';
import { SecondaryButton } from '@/components/SecondaryButton';
import { TextInput } from '@/components/TextInput';
import useTypedPage from '@/hooks/useTypedPage';

interface Props {
  requiresConfirmation: boolean;
}

export function TwoFactorAuthenticationForm({
  requiresConfirmation,
}: Props) {
  const page = useTypedPage();
  const [enabling, setEnabling] = useState(false);
  const [disabling, setDisabling] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [confirming, setConfirming] = useState(false);
  const [setupKey, setSetupKey] = useState<string | null>(null);
  const confirmationForm = useForm({
    code: '',
  });
  const twoFactorEnabled =
    !enabling && page.props?.auth?.user?.two_factor_enabled;

  function enableTwoFactorAuthentication() {
    setEnabling(true);

    router.post(
      '/user/two-factor-authentication',
      {},
      {
        preserveScroll: true,
        onSuccess() {
          return Promise.all([
            showQrCode(),
            showSetupKey(),
            showRecoveryCodes(),
          ]);
        },
        onFinish() {
          setEnabling(false);
          setConfirming(requiresConfirmation);
        },
      },
    );
  }

  function showSetupKey() {
    return axios.get('/user/two-factor-secret-key').then(response => {
      setSetupKey(response.data.secretKey);
    });
  }

  function confirmTwoFactorAuthentication() {
    confirmationForm.post('/user/confirmed-two-factor-authentication', {
      preserveScroll: true,
      preserveState: true,
      errorBag: 'confirmTwoFactorAuthentication',
      onSuccess: () => {
        setConfirming(false);
        setQrCode(null);
        setSetupKey(null);
      },
    });
  }

  function showQrCode() {
    return axios.get('/user/two-factor-qr-code').then(response => {
      setQrCode(response.data.svg);
    });
  }

  function showRecoveryCodes() {
    return axios.get('/user/two-factor-recovery-codes').then(response => {
      setRecoveryCodes(response.data);
    });
  }

  function regenerateRecoveryCodes() {
    axios.post('/user/two-factor-recovery-codes').then(() => {
      showRecoveryCodes();
    });
  }

  function disableTwoFactorAuthentication() {
    setDisabling(true);

    router.delete('/user/two-factor-authentication', {
      preserveScroll: true,
      onSuccess() {
        setDisabling(false);
        setConfirming(false);
      },
    });
  }

  return (
    <ActionSection
      title={'Two Factor Authentication'}
      description={
        'Add additional security to your account using two factor authentication.'
      }
    >
      {(() => {
        if (twoFactorEnabled && !confirming) {
          return (
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100">
              You have enabled two factor authentication.
            </h3>
          );
        }
        if (confirming) {
          return (
            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100">
              Finish enabling two factor authentication.
            </h3>
          );
        }
        return (
          <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100">
            You have not enabled two factor authentication.
          </h3>
        );
      })()}

      <div className="mt-3 max-w-xl text-sm text-stone-600 dark:text-stone-400">
        <p>
          When two factor authentication is enabled, you will be prompted for a
          secure, random token during authentication. You may retrieve this
          token from your phone's Google Authenticator application.
        </p>
      </div>

      {twoFactorEnabled || confirming ? (
        <div>
          {qrCode ? (
            <div>
              <div className="mt-4 max-w-xl text-sm text-stone-600 dark:text-stone-400">
                {confirming ? (
                  <p className="font-semibold">
                    To finish enabling two factor authentication, scan the
                    following QR code using your phone's authenticator
                    application or enter the setup key and provide the generated
                    OTP code.
                  </p>
                ) : (
                  <p>
                    Two factor authentication is now enabled. Scan the following
                    QR code using your phone's authenticator application or
                    enter the setup key.
                  </p>
                )}
              </div>

              <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: qrCode || '' }}
              />

              {setupKey && (
                <div className="mt-4 max-w-xl text-sm text-stone-600 dark:text-stone-400">
                  <p className="font-semibold">
                    Setup Key:{' '}
                    <span
                      dangerouslySetInnerHTML={{ __html: setupKey || '' }}
                    />
                  </p>
                </div>
              )}

              {confirming && (
                <div className="mt-4">
                  <InputLabel htmlFor="code" value="Code" />

                  <TextInput
                    id="code"
                    type="text"
                    name="code"
                    className="block mt-1 w-1/2"
                    inputMode="numeric"
                    autoFocus={true}
                    autoComplete="one-time-code"
                    value={confirmationForm.data.code}
                    onChange={e =>
                      confirmationForm.setData('code', e.currentTarget.value)
                    }
                  />

                  <InputError
                    message={confirmationForm.errors.code}
                    className="mt-2"
                  />
                </div>
              )}
            </div>
          ) : null}

          {recoveryCodes.length > 0 && !confirming ? (
            <div>
              <div className="mt-4 max-w-xl text-sm text-stone-600 dark:text-stone-400">
                <p className="font-semibold">
                  Store these recovery codes in a secure password manager. They
                  can be used to recover access to your account if your two
                  factor authentication device is lost.
                </p>
              </div>

              <div className="grid gap-1 max-w-xl mt-4 px-4 py-4 font-mono text-sm bg-stone-100 dark:bg-stone-900 rounded-lg">
                {recoveryCodes.map(code => (
                  <div key={code}>{code}</div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="mt-5">
        {twoFactorEnabled || confirming ? (
          <div>
            {confirming ? (
              <ConfirmsPassword onConfirm={confirmTwoFactorAuthentication}>
                <PrimaryButton
                  className={clsx('mr-3', { 'opacity-25': enabling })}
                  disabled={enabling}
                >
                  Confirm
                </PrimaryButton>
              </ConfirmsPassword>
            ) : null}
            {recoveryCodes.length > 0 && !confirming ? (
              <ConfirmsPassword onConfirm={regenerateRecoveryCodes}>
                <SecondaryButton className="mr-3">
                  Regenerate Recovery Codes
                </SecondaryButton>
              </ConfirmsPassword>
            ) : null}
            {recoveryCodes.length === 0 && !confirming ? (
              <ConfirmsPassword onConfirm={showRecoveryCodes}>
                <SecondaryButton className="mr-3">
                  Show Recovery Codes
                </SecondaryButton>
              </ConfirmsPassword>
            ) : null}

            {confirming ? (
              <ConfirmsPassword onConfirm={disableTwoFactorAuthentication}>
                <SecondaryButton
                  className={clsx('mr-3', { 'opacity-25': disabling })}
                  disabled={disabling}
                >
                  Cancel
                </SecondaryButton>
              </ConfirmsPassword>
            ) : (
              <ConfirmsPassword onConfirm={disableTwoFactorAuthentication}>
                <DangerButton
                  className={clsx({ 'opacity-25': disabling })}
                  disabled={disabling}
                >
                  Disable
                </DangerButton>
              </ConfirmsPassword>
            )}
          </div>
        ) : (
          <div>
            <ConfirmsPassword onConfirm={enableTwoFactorAuthentication}>
              <PrimaryButton
                type="button"
                className={clsx({ 'opacity-25': enabling })}
                disabled={enabling}
              >
                Enable
              </PrimaryButton>
            </ConfirmsPassword>
          </div>
        )}
      </div>
    </ActionSection>
  );
}
