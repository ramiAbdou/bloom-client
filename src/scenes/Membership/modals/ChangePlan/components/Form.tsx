import deepequal from 'fast-deep-equal';
import React from 'react';

import Label from '@components/Form/components/Label';
import PaymentForm from '@components/Payment/PaymentForm';
import ChangePlan from '@scenes/Membership/pages/ChangePlan/ChangePlan.store';
import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import PayButton from './FinishButton';

const CardOnFile = () => {
  const selectedTypeId = ChangePlan.useStoreState(
    (store) => store.selectedTypeId
  );

  const isFree: boolean = useStoreState(({ db }) => {
    return db.entities.types.byId[selectedTypeId]?.isFree;
  });

  const brand = useStoreState(({ db }) => db.member.paymentMethod?.brand);
  const last4 = useStoreState(({ db }) => db.member.paymentMethod?.last4);

  if (isFree) return null;

  const cardString = `${brand} ending in ${last4}`;

  return (
    <div className="c-form-item">
      <Label>Credit or Debit Card</Label>
      <p>{cardString}</p>
    </div>
  );
};

const ChangePlanForm = () => {
  const selectedTypeId = ChangePlan.useStoreState(
    (store) => store.selectedTypeId
  );

  const type = useStoreState(({ db }) => {
    return db.entities.types.byId[selectedTypeId];
  }, deepequal) as IMemberType;

  const hasCard = useStoreState(({ db }) => !!db.member.paymentMethod?.last4);

  if (!type) return null;

  const { amount, name, recurrence } = type;

  const recurrenceString = takeFirst([
    [recurrence === 'YEARLY', 'yr'],
    [recurrence === 'MONTHLY', 'mo'],
    [recurrence === 'LIFETIME', 'life']
  ]);

  const typeString = `${name}, $${amount / 100}/${recurrenceString}`;

  return (
    <PaymentForm
      SubmitButton={PayButton}
      hideCardItems={hasCard}
      isEmpty={hasCard}
    >
      <div className="c-form-item">
        <Label>Membership Type</Label>
        <p>{typeString}</p>
      </div>

      <CardOnFile />
    </PaymentForm>
  );
};

export default ChangePlanForm;
