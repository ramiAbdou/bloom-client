import React, { useEffect } from 'react';

import { ChildrenProps, ModalType } from '@constants';
import DuesModal from '@scenes/Actions/Dues/Dues';
import { useStoreActions, useStoreState } from '@store/Store';

export default function DuesWrapper({ children }: ChildrenProps) {
  // Get the user and see if they've paid their dues or not.
  const duesStatus = useStoreState(({ db }) => db.member?.duesStatus);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isUserActive = duesStatus === 'ACTIVE';

  useEffect(() => {
    if (duesStatus && !isUserActive) showModal(ModalType.PAY_DUES);
  }, [isUserActive]);

  return (
    <>
      {duesStatus && !isUserActive && <DuesModal />}
      {children}
    </>
  );
}
