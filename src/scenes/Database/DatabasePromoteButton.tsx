import React from 'react';
import { IoArrowUpCircle } from 'react-icons/io5';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import { useTableState } from '@components/organisms/Table/Table.state';
import { TableState } from '@components/organisms/Table/Table.types';
import { modalVar } from '@core/state/Modal.reactive';
import { ModalType } from '@util/constants';
import { take } from '@util/util';
import DatabaseAction from './DatabaseAction';

const DatabasePromoteButton: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);
  const { selectedRowIds }: TableState = useTableState();

  const tooManySelected: boolean = selectedRowIds.length > 15;
  const isSelfSelected: boolean = selectedRowIds.includes(memberId);

  const tooltip: string = take([
    [tooManySelected, 'Can only promote 15 members admins at a time.'],
    [isSelfSelected, `Can't promote yourself.`],
    [true, 'Promote to Admin(s)']
  ]);

  const onClick = (): void => {
    modalVar({
      id: ModalType.PROMOTE_MEMBERS,
      options: { confirmation: true }
    });
  };

  return (
    <DatabaseAction
      Icon={IoArrowUpCircle}
      className="o-table-action--promote"
      disabled={tooManySelected || isSelfSelected}
      tooltip={tooltip}
      onClick={onClick}
    />
  );
};

export default DatabasePromoteButton;
