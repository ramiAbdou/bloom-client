import deepequal from 'fast-deep-equal';
import React from 'react';

import Label from '@components/Form/components/Label';
import Modal from '@components/Modal/Modal';
import PaymentDescription from '@components/Payment/Description';
import PaymentForm from '@components/Payment/PaymentForm';
import StripeProvider from '@components/Payment/StripeProvider';
import { ModalType } from '@constants';
import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import ChangePlan from '../../pages/ChangePlan/ChangePlan.store';
import PayButton from './components/FinishButton';

const ChangePlanModal = () => {
  const selectedTypeId = ChangePlan.useStoreState(
    (store) => store.selectedTypeId
  );

  const type = useStoreState(({ db }) => {
    return db.entities.types.byId[selectedTypeId];
  }, deepequal) as IMemberType;

  if (!type) return null;

  const { amount, isFree, name, recurrence } = type;

  const recurrenceString = takeFirst([
    [recurrence === 'YEARLY', 'yr'],
    [recurrence === 'MONTHLY', 'mo'],
    [recurrence === 'LIFETIME', 'life']
  ]);

  return (
    <Modal id={ModalType.CHANGE_PLAN}>
      <StripeProvider>
        <h1>Change Membership Plan</h1>
        <PaymentDescription selectedTypeId={selectedTypeId} />
        <PaymentForm SubmitButton={PayButton}>
          <div className="c-form-item">
            <Label>Membership Type</Label>
            <p>
              {name}, ${amount / 100}/{recurrenceString}
            </p>
          </div>

          {!isFree && (
            <div className="c-form-item">
              <Label>Credit or Debit Card</Label>
              <p>Mastercard * 3221</p>
            </div>
          )}
        </PaymentForm>
      </StripeProvider>
    </Modal>
  );
};

export default ChangePlanModal;
