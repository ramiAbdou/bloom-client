import React from 'react';

import Button from '@atoms/Button';
import Card from '@components/Elements/Card/Card';
import { ModalType } from '@constants';
import { IMemberType } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import ChangePlan from '../ChangePlan.store';

const PlanCard = ({ amount, id, name, recurrence }: IMemberType) => {
  const isCurrent = useStoreState(({ db }) => db.member.type === id);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const setSelectedTypeId = ChangePlan.useStoreActions(
    (store) => store.setSelectedTypeId
  );

  const onClick = () => {
    showModal(ModalType.CHANGE_PLAN);
    setSelectedTypeId(id);
  };

  // Formats the amount with FREE if the amount is 0.
  const amountString = amount ? `$${amount / 100}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString = takeFirst([
    [recurrence === 'YEARLY', 'Per Year'],
    [recurrence === 'MONTHLY', 'Per Month'],
    [recurrence === 'LIFETIME', 'Lifetime']
  ]);

  return (
    <Card className="s-membership-plans-card">
      <h4>{name}</h4>

      <p>
        <span>{amountString}</span>
        <span>{recurrenceString}</span>
      </p>

      <Button
        fit
        disabled={isCurrent}
        outline={!isCurrent}
        primary={isCurrent}
        onClick={onClick}
      >
        {isCurrent ? 'Current Plan' : 'Change Plan'}
      </Button>
    </Card>
  );
};

export default PlanCard;
