import React from 'react';

import LoadingHeader from '@components/Elements/LoadingHeader/LoadingHeader';
import Modal from '@organisms/Modal/Modal';
import PaymentDescription from '@organisms/Payment/components/Description';
import StripeProvider from '@organisms/Payment/containers/StripeProvider';
import { ModalType } from '@constants';
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
