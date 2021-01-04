import React from 'react';

import LoadingHeader from '@components/Elements/LoadingHeader/LoadingHeader';
import Modal from '@components/Modal/Modal';
import PaymentDescription from '@components/Payment/components/Description';
import StripeProvider from '@components/Payment/containers/StripeProvider';
import PaymentForm from '@components/Payment/Payment';
import { ModalType } from '@constants';
import usePaymentMethod from '../../../Membership/usePaymentMethod';
import FinishDuesButton from './components/FinishButton';
import DuesTypeOptions from './components/TypeOptions';
import DuesContainer from './containers/Dues';
import Dues from './Dues.store';
import useCreateSubscription from './hooks/useCreateSubscription';

const DuesModalContent = () => {
  const selectedTypeId = Dues.useStoreState((store) => store.selectedTypeId);

  const createSubscription = useCreateSubscription();
  const { loading } = usePaymentMethod();

  // Will be null if the Stripe object hasn't been loaded yet.
  if (!createSubscription) return null;

  return (
    <Modal className="s-actions-dues" id={ModalType.PAY_DUES}>
      <LoadingHeader loading={loading} title="Pay Dues" />
      <PaymentDescription selectedTypeId={selectedTypeId} />
      <DuesTypeOptions />

      {!loading && (
        <PaymentForm
          SubmitButton={FinishDuesButton}
          selectedTypeId={selectedTypeId}
          onSubmit={createSubscription}
        />
      )}
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
