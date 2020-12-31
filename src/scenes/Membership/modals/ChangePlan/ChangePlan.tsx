import React from 'react';

import Label from '@components/Form/components/Label';
import Form from '@components/Form/Form';
import Modal from '@components/Modal/Modal';
import PaymentDescription from '@components/Payment/Description';
import StripeProvider from '@components/Payment/StripeProvider';
import { ModalType } from '@constants';
import { useStoreState } from '@store/Store';
import ChangePlan from '../../pages/ChangePlan/ChangePlan.store';
import PayButton from './components/FinishButton';

const ChangePlanModal = () => {
  const selectedTypeId = ChangePlan.useStoreState(
    (store) => store.selectedTypeId
  );

  const amount: number = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.amount / 100;
  });

  return (
    <Modal id={ModalType.CHANGE_PLAN}>
      <StripeProvider>
        <h1>Change Membership Plan</h1>
        <PaymentDescription selectedTypeId={selectedTypeId} />

        <Form>
          <div className="c-form-item">
            <Label>Membership Type</Label>
            <p>Graduate Member, $125/yr</p>
          </div>

          {!amount && (
            <div className="c-form-item">
              <Label>Credit or Debit Card</Label>
              <p>Mastercard * 3221</p>
            </div>
          )}

          <PayButton />
        </Form>
      </StripeProvider>
    </Modal>
  );
};

export default ChangePlanModal;
