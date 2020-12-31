import React from 'react';

import Modal from '@components/Modal/Modal';
import PaymentForm from '@components/Payment/PaymentForm';
import StripeProvider from '@components/Payment/StripeProvider';
import { ModalType } from '@constants';
import UpdatePaymentButton from './UpdateButton';

const UpdatePaymentModal = () => {
  return (
    <StripeProvider>
      <Modal id={ModalType.UPDATE_PAYMENT_METHOD}>
        <h1>Update Payment Method</h1>

        <p>
          An update to your current subscription will be reflected on your next
          billing date.
        </p>

        <PaymentForm SubmitButton={UpdatePaymentButton} />
      </Modal>
    </StripeProvider>
  );
};

export default UpdatePaymentModal;
