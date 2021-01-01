import deepequal from 'fast-deep-equal';
import React from 'react';

import Label from '@components/Form/components/Label';
import PaymentForm from '@components/Payment/Payment';
import ChangePlan from '@scenes/Membership/pages/ChangePlan/ChangePlan.store';
import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import PayButton from './FinishButton';

const ChangePlanForm = () => {
  const selectedTypeId = ChangePlan.useStoreState(
    (store) => store.selectedTypeId
  );

  const type = useStoreState(({ db }) => {
    return db.entities.types.byId[selectedTypeId];
  }, deepequal) as IMemberType;

  if (!type) return null;

  const { amount, name, recurrence } = type;

  const recurrenceString = takeFirst([
    [recurrence === 'YEARLY', 'yr'],
    [recurrence === 'MONTHLY', 'mo'],
    [recurrence === 'LIFETIME', 'life']
  ]);

  const typeString = `${name}, $${amount / 100}/${recurrenceString}`;

  return (
    <PaymentForm SubmitButton={PayButton} selectedTypeId={selectedTypeId}>
      <div className="c-form-item">
        <Label>Membership Type</Label>
        <p>{typeString}</p>
      </div>
    </PaymentForm>
  );
};

export default ChangePlanForm;
