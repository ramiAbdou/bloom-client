import React from 'react';

import Button from '@atoms/Button/Button';
import StatusTag from '@atoms/Tag/StatusTag';
import Show from '@containers/Show';
import { PaymentModalType } from '@modals/Payment/Payment.types';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';

const SidebarPayDuesButton: React.FC = () => {
  const currentTypeId: string = useStoreState(
    ({ db }) => db.member?.memberType
  );

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({
      id: ModalType.PAY_DUES,
      metadata: {
        selectedMemberTypeId: currentTypeId,
        type: PaymentModalType.PAY_DUES
      }
    });
  };

  return (
    <Button fill secondary onClick={onClick}>
      Pay Dues
    </Button>
  );
};

const SidebarMemberStatus: React.FC = () => {
  const canCollectDues: boolean = useStoreState(
    ({ db }) => db.community?.canCollectDues
  );

  const isDuesActive: boolean = useStoreState(
    ({ db }) => db.member?.isDuesActive
  );

  return (
    <Show show={!!canCollectDues && !isDuesActive}>
      <div className="o-nav-dues-ctr">
        <StatusTag positive={false}>Member Status: Inactive</StatusTag>
        <SidebarPayDuesButton />
      </div>
    </Show>
  );
};

export default SidebarMemberStatus;
