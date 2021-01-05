import React from 'react';

import { ModalType } from '@constants';
import LoadingHeader from '@molecules/LoadingHeader/LoadingHeader';
import Modal from '@organisms/Modal/Modal';
import PaymentDescription from '@organisms/Payment/components/Description';
import StripeProvider from '@organisms/Payment/containers/StripeProvider';
import ChangePlan from '../../pages/ChangePlan/ChangePlan.store';
import usePaymentMethod from '../../usePaymentMethod';
import ChangePlanForm from './components/Form';

const ChangePlanModal = () => {
  const selectedTypeId = ChangePlan.useStoreState(
    (store) => store.selectedTypeId
  );

  const { loading } = usePaymentMethod();

  return (
    <Modal id={ModalType.CHANGE_PLAN}>
      <StripeProvider>
        <LoadingHeader loading={loading} title="Change Membership Plan" />
        <PaymentDescription selectedTypeId={selectedTypeId} />
        <ChangePlanForm />
      </StripeProvider>
    </Modal>
  );
};

export default ChangePlanModal;
