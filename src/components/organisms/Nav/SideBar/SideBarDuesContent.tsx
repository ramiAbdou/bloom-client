import React from 'react';

import Button from '@atoms/Button/Button';
import StatusTag from '@atoms/Tags/StatusTag';
import { useStoreActions, useStoreState } from '@store/Store';

const SideBarDuesContent: React.FC = () => {
  const canCollectDues = useStoreState(({ db }) => db.canCollectDues);
  const hasPaid = useStoreState(({ db }) => db.member?.duesStatus === 'Active');
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  if (!canCollectDues || hasPaid) return null;

  const onClick = () => showModal('PAY_DUES');

  return (
    <div className="o-side-bar-dues-ctr">
      <StatusTag positive={false}>Member Status: Inactive</StatusTag>
      <Button fill secondary onClick={onClick}>
        Pay Dues
      </Button>
    </div>
  );
};

export default SideBarDuesContent;
