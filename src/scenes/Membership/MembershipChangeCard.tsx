import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import { PaymentModalType } from '@modals/Payment/Payment.types';
import { IMemberPlan, RecurrenceType } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { IdProps, ModalType } from '@util/constants';
import { take } from '@util/util';

const MembershipChangeCard: React.FC<IdProps> = ({ id: planId }) => {
  const plan: IMemberPlan = useStoreState(
    ({ db }) => db.byMemberPlanId[planId]
  );

  const isCurrent = useStoreState(({ db }) => db.member.plan === planId);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({
      id: ModalType.CHANGE_MEMBERSHIP,
      metadata: {
        selectedPlanId: planId,
        type: PaymentModalType.CHANGE_MEMBERSHIP
      }
    });
  };

  // Formats the amount with FREE if the amount is 0.
  const amountString: string = plan.amount ? `$${plan.amount}` : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString: string = take([
    [plan.recurrence === RecurrenceType.YEARLY, 'Per Year'],
    [plan.recurrence === RecurrenceType.MONTHLY, 'Per Month']
  ]);

  return (
    <Card className="s-membership-card">
      <h4>{plan.name}</h4>

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
