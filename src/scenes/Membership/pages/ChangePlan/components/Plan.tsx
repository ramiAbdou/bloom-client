import React from 'react';

import Button from '@components/Button/Button';
import Card from '@components/Elements/Card/Card';
import { ModalType } from '@constants';
import { useStoreActions } from '@store/Store';
import ChangePlan from '../ChangePlan.store';

type PlanCardProps = { isCurrent?: boolean };

const PlanCard = ({ isCurrent }: PlanCardProps) => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const setSelectedTypeId = ChangePlan.useStoreActions(
    (store) => store.setSelectedTypeId
  );

  const onClick = () => {
    showModal(ModalType.CHANGE_PLAN);
    setSelectedTypeId('');
  };

  return (
    <Card className="s-membership-plans-card">
      <h4>Undergraduate Member</h4>

      <p>
        <span>FREE</span>
        <span>Per Year</span>
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
