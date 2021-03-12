import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import { IMemberPlan, RecurrenceType } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { take } from '@util/util';

const MembershipChangeCard: React.FC<IMemberPlan> = ({
  amount,
  id,
  name,
  recurrence
}) => {
  const isCurrent = useStoreState(({ db }) => db.member.plan === id);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({
      id: ModalType.CHANGE_MEMBERSHIP,
      metadata: { selectedPlanId: id, type: 'CHANGE_MEMBERSHIP' }
    });
  };

  // Formats the amount with FREE if the amount is 0.
  const amountString = amount ? `$${amount}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString = take([
    [recurrence === RecurrenceType.YEARLY, 'Per Year'],
    [recurrence === RecurrenceType.MONTHLY, 'Per Month'],
    [recurrence === RecurrenceType.LIFETIME, 'Lifetime']
  ]);

  return (
    <Card className="s-membership-card">
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

export default MembershipChangeCard;
