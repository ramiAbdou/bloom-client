import React from 'react';

import { ModalType } from '@constants';
import Modal from '@organisms/Modal/Modal';
import StripeProvider from '@organisms/Payment/containers/StripeProvider';
import PaymentForm from '@organisms/Payment/Payment';
import useUpdatePaymentMethod from '../../useUpdatePaymentMethod';
import UpdatePaymentButton from './UpdateButton';

const UpdatePaymentModalContent = () => {
  const updatePaymentMethod = useUpdatePaymentMethod();
  return (
    <>
      <h1>Update Payment Method</h1>

      <p>
        An update to your current subscription will be reflected on your next
        billing date.
      </p>

      <PaymentForm
        isCardChanging
        SubmitButton={UpdatePaymentButton}
        onSubmit={updatePaymentMethod}
      />
    </>
  );
};

const UpdatePaymentModal = () => (
  <Modal id={ModalType.UPDATE_PAYMENT_METHOD}>
    <StripeProvider>
      <UpdatePaymentModalContent />
    </StripeProvider>
  </Modal>
);

export default UpdatePaymentModal;
