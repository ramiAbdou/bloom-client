import React from 'react';

import Form from '@organisms/Form/Form';
import PaymentFormErrorMessage from '@organisms/Form/FormErrorMessage';
import ModalContentContainer from '@organisms/Modal/ModalContentContainer';
import LoadingStore from '@store/Loading.store';
import PaymentStore from './Payment.store';
import PaymentCardForm from './PaymentCardForm';
import PaymentContinueButton from './PaymentContinueButton';
import PaymentFinishButton from './PaymentFinishButton';
import useUpdatePaymentMethod from './useUpdatePaymentMethod';

const PaymentCardSubmitButton: React.FC = () => {
  const isUpdatingPaymentMethod =
    PaymentStore.useStoreState((store) => store.type) ===
    'UPDATE_PAYMENT_METHOD';

  if (isUpdatingPaymentMethod) return <PaymentFinishButton />;
  return <PaymentContinueButton />;
};

const PaymentCardScreenContent: React.FC = () => {
  const loading = LoadingStore.useStoreState((store) => store.loading);
  if (loading) return null;

  return (
    <>
      <ModalContentContainer>
        <PaymentCardForm />
      </ModalContentContainer>

      <PaymentFormErrorMessage />
      <PaymentCardSubmitButton />
    </>
  );
};

const PaymentCardScreen: React.FC = () => {
  const loading = LoadingStore.useStoreState((store) => store.loading);
  const screen = PaymentStore.useStoreState((store) => store.screen);

  const updatePaymentMethod = useUpdatePaymentMethod();

  // Will be null if the Stripe object hasn't been loaded yet.
  if (screen !== 'CARD_FORM' || !updatePaymentMethod || loading) return null;

  return (
    <Form className="mo-payment" onSubmit={updatePaymentMethod}>
      <PaymentCardScreenContent />
    </Form>
  );
};

export default PaymentCardScreen;
