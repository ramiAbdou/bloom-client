import React from 'react';
import { IoArrowUpCircle } from 'react-icons/io5';

import TableStore from '@components/organisms/Table/Table.store';
import { useStoreActions, useStoreState } from '@core/store/Store';
import { ModalType } from '@util/constants';
import { take } from '@util/util';
import DatabaseAction from '../DatabaseAction';

const MemberDatabasePromoteButton: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const tooManySelected = TableStore.useStoreState(
    ({ selectedRowIds }) => selectedRowIds.length > 15
  );

  const selfSelected = TableStore.useStoreState(({ selectedRowIds }) =>
    selectedRowIds.includes(memberId)
  );

  const tooltip: string = take([
    [tooManySelected, 'Can only promote 15 members admins at a time.'],
    [selfSelected, `Can't promote yourself.`],
    [true, 'Promote to Admin(s)']
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
