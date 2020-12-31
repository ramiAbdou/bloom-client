import React from 'react';

import Modal from '@components/Modal/Modal';
import PaymentForm from '@components/Payment/PaymentForm';
import { ModalType } from '@constants';
import { useStoreState } from '@store/Store';
import DuesDescription from './components/Description';
import DuesTypeOptions from './components/TypeOptions';
import DuesContainer from './containers/Dues';
import Dues from './Dues.store';
import useCreateSubscription from './hooks/useCreateSubscription';

const DuesModalContent = () => {
  const selectedTypeId = Dues.useStoreState((store) => store.selectedTypeId);

  const amount: number = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.amount / 100;
  });

  const createSubscription = useCreateSubscription();

  // Will be null if the Stripe object hasn't been loaded yet.
  if (!createSubscription) return null;

  return (
    <Modal className="s-actions-dues" id={ModalType.PAY_DUES}>
      <h1>Pay Dues</h1>
      <DuesDescription />
      <DuesTypeOptions />
      <PaymentForm amount={amount} onSubmit={createSubscription} />
    </Modal>
  );
};

export default () => (
  <DuesContainer>
    <DuesModalContent />
  </DuesContainer>
);
