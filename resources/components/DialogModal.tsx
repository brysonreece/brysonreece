import React, { PropsWithChildren } from 'react';
import { Modal, ModalProps } from '@/components/Modal';

DialogModal.Content = function DialogModalContent({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div className="px-6 py-4">
      <div className="text-lg font-medium text-stone-900 dark:text-stone-100">
        {title}
      </div>

      <div className="mt-4 text-sm text-stone-600 dark:text-stone-400">
        {children}
      </div>
    </div>
  );
};

DialogModal.Footer = function DialogModalFooter({
  children,
}: PropsWithChildren<Record<string, unknown>>) {
  return (
    <div className="px-6 py-4 bg-stone-100 dark:bg-stone-800 text-right">
      {children}
    </div>
  );
};

export function DialogModal({
  children,
  ...modalProps
}: PropsWithChildren<ModalProps>) {
  return <Modal {...modalProps}>{children}</Modal>;
}
