import React from 'react';

import Button from '@atoms/Button/Button';
import StatusTag from '@atoms/Tags/StatusTag';
import Show from '@containers/Show';
import { useStoreActions, useStoreState } from '@store/Store';

const NavMemberStatus: React.FC = () => {
  const canCollectDues = useStoreState(({ db }) => db.community.canCollectDues);
  const hasPaid = useStoreState(({ db }) => db.member?.duesStatus === 'Active');
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => showModal('PAY_DUES');

  return (
    <Show show={!!canCollectDues && !hasPaid}>
      <div className="o-nav-dues-ctr">
        <StatusTag positive={false}>Member Status: Inactive</StatusTag>
        <Button fill secondary onClick={onClick}>
          Pay Dues
        </Button>
      </div>
    </Show>
  );
};

export default NavMemberStatus;
