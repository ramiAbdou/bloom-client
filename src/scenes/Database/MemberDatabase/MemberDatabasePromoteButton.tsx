import React from 'react';
import { IoArrowUpCircle } from 'react-icons/io5';

import { ModalType } from '@constants';
import ModalStore from '@organisms/Modal/LocalModal.store';
import TableStore from '@organisms/Table/Table.store';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import DatabaseAction from '../DatabaseAction';

const MemberDatabasePromoteButton: React.FC = () => {
  const memberId = useStoreState(({ db }) => db.member.id);
  const showModal = ModalStore.useStoreActions((store) => store.showModal);

  const tooManySelected = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length > 15
  );

  const selfSelected = TableStore.useStoreState(({ selectedRowIds }) =>
    selectedRowIds.includes(memberId)
  );

  const tooltip: string = takeFirst([
    [tooManySelected, 'Can only promote 15 members admins at a time.'],
    [selfSelected, `Can't promote yourself.`],
    'Promote to Admin(s)'
  ]);

  const onClick = () => showModal({ id: ModalType.PROMOTE_MEMBERS });

  return (
    <DatabaseAction
      Icon={IoArrowUpCircle}
      className="o-table-action--promote"
      disabled={tooManySelected || selfSelected}
      tooltip={tooltip}
      onClick={onClick}
    />
  );
};

export default MemberDatabasePromoteButton;
