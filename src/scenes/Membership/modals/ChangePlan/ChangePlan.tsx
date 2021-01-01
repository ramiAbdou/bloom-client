import React from 'react';

import Spinner from '@components/Loader/Spinner';
import Modal from '@components/Modal/Modal';
import PaymentDescription from '@components/Payment/Description';
import StripeProvider from '@components/Payment/StripeProvider';
import { ModalType } from '@constants';
import usePaymentMethod from '../../hooks/usePaymentMethod';
import ChangePlan from '../../pages/ChangePlan/ChangePlan.store';
import ChangePlanForm from './components/Form';

const ChangePlanModal = () => {
  const selectedTypeId = ChangePlan.useStoreState(
    (store) => store.selectedTypeId
  );

  const { loading } = usePaymentMethod();

  return (
    <Modal id={ModalType.CHANGE_PLAN}>
      <StripeProvider>
        <div>
          <h1>Change Membership Plan</h1>
          <Spinner dark loading={loading} />
        </div>

        <PaymentDescription selectedTypeId={selectedTypeId} />
        <ChangePlanForm />
      </StripeProvider>
    </Modal>
  );
};

export default ChangePlanModal;
