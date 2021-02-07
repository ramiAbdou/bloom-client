import React from 'react';
import { IoArrowUpCircle } from 'react-icons/io5';

import { ModalType } from '@constants';
import TableStore from '@organisms/Table/Table.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import DatabaseAction from '../DatabaseAction';

const MemberDatabasePromoteButton: React.FC = () => {
  const memberId = useStoreState(({ db }) => db.member.id);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

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

  const onClick = () => showModal(ModalType.PROMOTE_TO_ADMIN);

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
