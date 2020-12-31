import React from 'react';

import Modal from '@components/Modal/Modal';
import PaymentDescription from '@components/Payment/Description';
import PaymentForm from '@components/Payment/PaymentForm';
import StripeProvider from '@components/Payment/StripeProvider';
import { ModalType } from '@constants';
import { useStoreState } from '@store/Store';
import FinishDuesButton from './components/FinishButton';
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
      <PaymentDescription selectedTypeId={selectedTypeId} />
      <DuesTypeOptions />
      <PaymentForm
        SubmitButton={FinishDuesButton}
        hideCardItems={!amount}
        onSubmit={createSubscription}
      />
    </Modal>
  );
};

export default () => (
  <DuesContainer>
    <StripeProvider>
      <DuesModalContent />
    </StripeProvider>
  </DuesContainer>
);
