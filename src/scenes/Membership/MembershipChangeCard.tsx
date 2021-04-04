import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import { PaymentModalType } from '@modals/Payment/Payment.types';
import { IMemberType, RecurrenceType } from '@store/db/Db.entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { IdProps, ModalType } from '@util/constants';
import { take } from '@util/util';

const MembershipChangeCard: React.FC<IdProps> = ({ id: memberTypeId }) => {
  const memberType: IMemberType = useStoreState(
    ({ db }) => db.byMemberTypeId[memberTypeId]
  );

  const isCurrent = useStoreState(
    ({ db }) => db.member.memberType === memberTypeId
  );

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({
      id: ModalType.CHANGE_MEMBERSHIP,
      metadata: {
        selectedMemberTypeId: memberTypeId,
        type: PaymentModalType.CHANGE_MEMBERSHIP
      }
    });
  };

  // Formats the amount with FREE if the amount is 0.
  const amountString: string = memberType.amount
    ? `$${memberType.amount}`
    : 'FREE';

  // Construct string "Per" timespan based on the recurrence.
  const recurrenceString: string = take([
    [memberType.recurrence === RecurrenceType.YEARLY, 'Per Year'],
    [memberType.recurrence === RecurrenceType.MONTHLY, 'Per Month']
  ]);

  return (
    <Card className="s-membership-card">
      <h4>{memberType.name}</h4>

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
        {isCurrent ? 'Current Type' : 'Change Type'}
      </Button>
    </Card>
  );
};

export default MembershipChangeCard;
