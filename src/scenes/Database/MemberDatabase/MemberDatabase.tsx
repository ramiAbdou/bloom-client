import { ActionCreator } from 'easy-peasy';
import React from 'react';

import { IQuestion } from '@db/db.entities';
import GQL from '@gql/GQL';
import useGQL from '@gql/useGQL';
import { ModalData } from '@organisms/Modal/Modal.types';
import ModalLocal from '@organisms/Modal/ModalLocal';
import Table from '@organisms/Table/Table';
import {
  RenameColumnFunction,
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { useStoreActions } from '@store/Store';
import { ModalType } from '@util/constants';
import {
  useMemberDatabaseColumns,
  useMemberDatabaseRows
} from '../Database.util';
import MemberDatabaseActions from './MemberDatabaseActions';

const MemberDatabase: React.FC = () => {
  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const gql: GQL = useGQL();

  // Massage the member data into valid row data by mapping the question ID
  // to the value for each member.
  const rows: TableRow[] = useMemberDatabaseRows();
  const columns: TableColumn[] = useMemberDatabaseColumns();

  const onRenameColumn: RenameColumnFunction = async ({
    column,
    updateColumn
  }) => {
    const { title, id } = column;

    const { error } = await gql.update(IQuestion, {
      data: { title },
      where: { id }
    });

    if (!error) updateColumn({ id, title });
  };

  const options: TableOptions = {
    hasCheckbox: true,
    onRenameColumn,
    onRowClick: ({ id: memberId }: TableRow) => {
      showModal({ id: ModalType.PROFILE, metadata: memberId });
    }
  };

  return (
    <Table
      TableActions={MemberDatabaseActions}
      columns={columns}
      options={options}
      show={!!columns?.length}
    >
      <TableContent rows={rows} />
      <ModalLocal />
    </Table>
  );
};

export default MemberDatabase;
