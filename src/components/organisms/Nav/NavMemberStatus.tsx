import React from 'react';

import Button from '@atoms/Button/Button';
import StatusTag from '@atoms/Tag/StatusTag';
import { ModalType } from '@constants';
import Show from '@containers/Show';
import ModalStore from '@organisms/Modal/Modal.store';
import { useStoreState } from '@store/Store';

const NavMemberStatus: React.FC = () => {
  const canCollectDues = useStoreState(({ db }) => db.community.canCollectDues);
  const isDuesActive = useStoreState(({ db }) => db.member?.isDuesActive);
  const showModal = ModalStore.useStoreActions((store) => store.showModal);

  const currentTypeId: string = useStoreState(({ db }) => {
    return db.member?.type;
  });

  const onClick = () => {
    showModal({
      id: ModalType.PAY_DUES,
      metadata: { selectedTypeId: currentTypeId, type: 'PAY_DUES' }
    });
  };

  return (
    <Show show={!!canCollectDues && !isDuesActive}>
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
