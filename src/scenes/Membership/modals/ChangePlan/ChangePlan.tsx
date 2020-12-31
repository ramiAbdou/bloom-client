import React from 'react';

import Modal from '@components/Modal/Modal';
// import PaymentForm from '@components/Payment/PaymentForm';
import StripeProvider from '@components/Payment/StripeProvider';
import { ModalType } from '@constants';
import ChangePlanDescription from './components/Description';

const ChangePlanModal = () => {
  return (
    <StripeProvider>
      <Modal id={ModalType.CHANGE_PLAN}>
        <h1>Change Membership Plan</h1>
        <ChangePlanDescription />

        {/* <PaymentForm updateCard SubmitButton={UpdatePaymentButton} /> */}
      </Modal>
    </StripeProvider>
  );
};

export default ChangePlanModal;
