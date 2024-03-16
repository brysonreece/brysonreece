import { useForm } from '@inertiajs/react';
import clsx from 'clsx';
import React, { useState } from 'react';
import useTypedPage from '@/hooks/useTypedPage';
import { ActionMessage } from '@/components/ActionMessage';
import { ActionSection } from '@/components/ActionSection';
import { Checkbox } from '@/components/Checkbox';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import { DangerButton } from '@/components/DangerButton';
import { DialogModal } from '@/components/DialogModal';
import { FormSection } from '@/components/FormSection';
import { InputError } from '@/components/InputError';
import { InputLabel } from '@/components/InputLabel';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TextInput } from '@/components/TextInput';
import { SecondaryButton } from '@/components/SecondaryButton';
import { SectionBorder } from '@/components/SectionBorder';
import { ApiToken } from '@/types';

interface Props {
  tokens: ApiToken[];
  availablePermissions: string[];
  defaultPermissions: string[];
}

export function APITokenManager({
  tokens,
  availablePermissions,
  defaultPermissions,
}: Props) {
  const createApiTokenForm = useForm({
    name: '',
    permissions: defaultPermissions,
  });
  const updateApiTokenForm = useForm({
    permissions: [] as string[],
  });
  const deleteApiTokenForm = useForm({});
  const [displayingToken, setDisplayingToken] = useState(false);
  const [managingPermissionsFor, setManagingPermissionsFor] =
    useState<ApiToken | null>(null);
  const [apiTokenBeingDeleted, setApiTokenBeingDeleted] =
    useState<ApiToken | null>(null);
  const page = useTypedPage();

  function createApiToken() {
    createApiTokenForm.post(route('api-tokens.store'), {
      preserveScroll: true,
      onSuccess: () => {
        setDisplayingToken(true);
        createApiTokenForm.reset();
      },
    });
  }

  function manageApiTokenPermissions(token: ApiToken) {
    updateApiTokenForm.setData('permissions', token.abilities);
    setManagingPermissionsFor(token);
  }

  function updateApiToken() {
    if (!managingPermissionsFor) {
      return;
    }
    updateApiTokenForm.put(
      route('api-tokens.update', [managingPermissionsFor]),
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => setManagingPermissionsFor(null),
      },
    );
  }

  function confirmApiTokenDeletion(token: ApiToken) {
    setApiTokenBeingDeleted(token);
  }

  function deleteApiToken() {
    if (!apiTokenBeingDeleted) {
      return;
    }
    deleteApiTokenForm.delete(
      route('api-tokens.destroy', [apiTokenBeingDeleted]),
      {
        preserveScroll: true,
        preserveState: true,
        onSuccess: () => setApiTokenBeingDeleted(null),
      },
    );
  }

  return (
    <div>
      {/* <!-- Generate API Token --> */}
      <FormSection
        onSubmit={createApiToken}
        title={'Create API Token'}
        description={
          'API tokens allow third-party services to authenticate with our application on your behalf.'
        }
        renderActions={() => (
          <>
            <ActionMessage
              on={createApiTokenForm.recentlySuccessful}
              className="mr-3"
            >
              Created.
            </ActionMessage>

            <PrimaryButton
              className={clsx({
                'opacity-25': createApiTokenForm.processing,
              })}
              disabled={createApiTokenForm.processing}
            >
              Create
            </PrimaryButton>
          </>
        )}
      >
        {/* <!-- Token Name --> */}
        <div className="col-span-6 sm:col-span-4">
          <InputLabel htmlFor="name">Name</InputLabel>
          <TextInput
            id="name"
            type="text"
            className="mt-1 block w-full"
            value={createApiTokenForm.data.name}
            onChange={e =>
              createApiTokenForm.setData('name', e.currentTarget.value)
            }
            autoFocus
          />
          <InputError
            message={createApiTokenForm.errors.name}
            className="mt-2"
          />
        </div>

        {/* <!-- Token Permissions --> */}
        {availablePermissions.length > 0 && (
          <div className="col-span-6">
            <InputLabel htmlFor="permissions">Permissions</InputLabel>

            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              {availablePermissions.map(permission => (
                <div key={permission}>
                  <label className="flex items-center">
                    <Checkbox
                      value={permission}
                      checked={createApiTokenForm.data.permissions.includes(
                        permission,
                      )}
                      onChange={e => {
                        if (
                          createApiTokenForm.data.permissions.includes(
                            e.currentTarget.value,
                          )
                        ) {
                          createApiTokenForm.setData(
                            'permissions',
                            createApiTokenForm.data.permissions.filter(
                              p => p !== e.currentTarget.value,
                            ),
                          );
                        } else {
                          createApiTokenForm.setData('permissions', [
                            e.currentTarget.value,
                            ...createApiTokenForm.data.permissions,
                          ]);
                        }
                      }}
                    />
                    <span className="ml-2 text-sm text-stone-600 dark:text-stone-400">
                      {permission}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </FormSection>

      {tokens.length > 0 ? (
        <div>
          <SectionBorder />

          {/* <!-- Manage API Tokens --> */}
          <div className="mt-10 sm:mt-0">
            <ActionSection
              title={'Manage API Tokens'}
              description={
                'You may delete any of your existing tokens if they are no longer needed.'
              }
            >
              {/* <!-- API Token List --> */}
              <div className="space-y-6">
                {tokens.map(token => (
                  <div
                    className="flex items-center justify-between"
                    key={token.id}
                  >
                    <div className="break-all dark:text-white">
                      {token.name}
                    </div>

                    <div className="flex items-center">
                      {token.last_used_ago && (
                        <div className="text-sm text-stone-400">
                          Last used {token.last_used_ago}
                        </div>
                      )}

                      {availablePermissions.length > 0 ? (
                        <PrimaryButton
                          className="cursor-pointer ml-6 text-sm text-stone-400 underline"
                          onClick={() => manageApiTokenPermissions(token)}
                        >
                          Permissions
                        </PrimaryButton>
                      ) : null}

                      <PrimaryButton
                        className="cursor-pointer ml-6 text-sm text-red-500"
                        onClick={() => confirmApiTokenDeletion(token)}
                      >
                        Delete
                      </PrimaryButton>
                    </div>
                  </div>
                ))}
              </div>
            </ActionSection>
          </div>
        </div>
      ) : null}

      {/* <!-- Token Value Modal --> */}
      <DialogModal
        isOpen={displayingToken}
        onClose={() => setDisplayingToken(false)}
      >
        <DialogModal.Content title={'API Token'}>
          <div>
            Please copy your new API token. For your security, it won't be shown
            again.
          </div>

          <div className="mt-4 bg-stone-100 dark:bg-stone-900 px-4 py-2 rounded font-mono text-sm text-stone-500">
            {page.props?.jetstream?.flash?.token}
          </div>
        </DialogModal.Content>
        <DialogModal.Footer>
          <SecondaryButton onClick={() => setDisplayingToken(false)}>
            Close
          </SecondaryButton>
        </DialogModal.Footer>
      </DialogModal>

      {/* <!-- API Token Permissions Modal --> */}
      <DialogModal
        isOpen={!!managingPermissionsFor}
        onClose={() => setManagingPermissionsFor(null)}
      >
        <DialogModal.Content title={'API Token Permissions'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePermissions.map(permission => (
              <div key={permission}>
                <label className="flex items-center">
                  <Checkbox
                    value={permission}
                    checked={updateApiTokenForm.data.permissions.includes(
                      permission,
                    )}
                    onChange={e => {
                      if (
                        updateApiTokenForm.data.permissions.includes(
                          e.currentTarget.value,
                        )
                      ) {
                        updateApiTokenForm.setData(
                          'permissions',
                          updateApiTokenForm.data.permissions.filter(
                            p => p !== e.currentTarget.value,
                          ),
                        );
                      } else {
                        updateApiTokenForm.setData('permissions', [
                          e.currentTarget.value,
                          ...updateApiTokenForm.data.permissions,
                        ]);
                      }
                    }}
                  />
                  <span className="ml-2 text-sm text-stone-600 dark:text-stone-400">
                    {permission}
                  </span>
                </label>
              </div>
            ))}
          </div>
        </DialogModal.Content>
        <DialogModal.Footer>
          <SecondaryButton onClick={() => setManagingPermissionsFor(null)}>
            Cancel
          </SecondaryButton>

          <PrimaryButton
            onClick={updateApiToken}
            className={clsx('ml-2', {
              'opacity-25': updateApiTokenForm.processing,
            })}
            disabled={updateApiTokenForm.processing}
          >
            Save
          </PrimaryButton>
        </DialogModal.Footer>
      </DialogModal>

      {/* <!-- Delete Token Confirmation Modal --> */}
      <ConfirmationModal
        isOpen={!!apiTokenBeingDeleted}
        onClose={() => setApiTokenBeingDeleted(null)}
      >
        <ConfirmationModal.Content title={'Delete API Token'}>
          Are you sure you would like to delete this API token?
        </ConfirmationModal.Content>
        <ConfirmationModal.Footer>
          <SecondaryButton onClick={() => setApiTokenBeingDeleted(null)}>
            Cancel
          </SecondaryButton>

          <DangerButton
            onClick={deleteApiToken}
            className={clsx('ml-2', {
              'opacity-25': deleteApiTokenForm.processing,
            })}
            disabled={deleteApiTokenForm.processing}
          >
            Delete
          </DangerButton>
        </ConfirmationModal.Footer>
      </ConfirmationModal>
    </div>
  );
}
