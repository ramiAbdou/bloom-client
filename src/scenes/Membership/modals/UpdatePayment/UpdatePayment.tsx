import React from 'react';

import Modal from '@components/Modal/Modal';
import StripeProvider from '@components/Payment/containers/StripeProvider';
import PaymentForm from '@components/Payment/Payment';
import { ModalType } from '@constants';
import UpdatePaymentButton from './UpdateButton';

const UpdatePaymentModal = () => {
  return (
    <Modal id={ModalType.UPDATE_PAYMENT_METHOD}>
      <StripeProvider>
        <h1>Update Payment Method</h1>

        <p>
          An update to your current subscription will be reflected on your next
          billing date.
        </p>

        <PaymentForm isCardChanging SubmitButton={UpdatePaymentButton} />
      </StripeProvider>
    </Modal>
  );
};

export default UpdatePaymentModal;
