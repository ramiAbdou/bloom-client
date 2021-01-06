import React from 'react';

import Button from '@atoms/Button';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import { IMemberType } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import ChangePlanStore from './Membership.store';

const PlanCard = ({ amount, id, name, recurrence }: IMemberType) => {
  const isCurrent = useStoreState(({ db }) => db.member.type === id);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const setSelectedTypeId = ChangePlanStore.useStoreActions(
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
        fill
        disabled={isCurrent}
        primary={isCurrent}
        secondary={!isCurrent}
        onClick={onClick}
      >
        {isCurrent ? 'Current Plan' : 'Change Plan'}
      </Button>
    </Card>
  );
};

export default PlanCard;
