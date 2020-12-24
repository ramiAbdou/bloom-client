import React from 'react';

import Form from '@components/Form/Form';
import Modal from '@components/Modal/Modal';
import { ChildrenProps, ModalType } from '@constants';
import useCreateSubscription from '../hooks/useCreateSubscription';

export default function ModalContainer({ children }: ChildrenProps) {
  const createSubscription = useCreateSubscription();

  // Will be null if the Stripe object hasn't been loaded yet.
  if (!createSubscription) return null;

  return (
    <Modal locked id={ModalType.PAY_DUES}>
      <Form className="s-actions-dues" onSubmit={createSubscription}>
        {children}
      </Form>
    </Modal>
  );
}
