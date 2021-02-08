import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import ModalStore from '@organisms/Modal/Modal.store';
import { IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import ChangePlanStore from './Membership.store';

const MembershipChangeCard: React.FC<IMemberType> = ({
  amount,
  id,
  name,
  recurrence
}) => {
  const isCurrent = useStoreState(({ db }) => db.member.type === id);
  const showModal = ModalStore.useStoreActions((store) => store.showModal);

  const setSelectedTypeId = ChangePlanStore.useStoreActions(
    (store) => store.setSelectedTypeId
  );

  const onClick = () => {
    setSelectedTypeId(id);

    showModal({
      id: ModalType.CHANGE_MEMBERSHIP,
      metadata: { selectedTypeId: id, type: 'CHANGE_MEMBERSHIP' }
    });
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
