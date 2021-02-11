import React from 'react';

import { ModalType } from '@constants';
import useMutation from '@hooks/useMutation';
import ModalLocal from '@organisms/Modal/ModalLocal';
import Table from '@organisms/Table/Table';
import {
  OnRenameColumn,
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IIntegrations, IQuestion } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { UPDATE_QUESTION, UpdateQuestionArgs } from '../Database.gql';
import { getMemberTableRow } from '../Database.util';
import MemberDatabaseActions from './MemberDatabaseActions';

const MemberDatabase: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  // Massage the member data into valid row data by mapping the question ID
  // to the value for each member.
  const rows: TableRow[] = useStoreState(({ db }) => getMemberTableRow({ db }));

  const columns: TableColumn[] = useStoreState(({ db }) => {
    const integrations: IIntegrations =
      db.byIntegrationsId[db.community?.integrations];

    return db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.filter(({ category }: IQuestion) => {
        if (category === 'DUES_STATUS' && !integrations.stripeAccountId) {
          return false;
        }

        return true;
      });
  });

  const [updateQuestion] = useMutation<IQuestion, UpdateQuestionArgs>({
    operation: 'updateQuestion',
    query: UPDATE_QUESTION,
    schema: Schema.QUESTION
  });

  const onRenameColumn: OnRenameColumn = async ({ column, updateColumn }) => {
    const { title, id } = column;
    const { error } = await updateQuestion({ questionId: id, title });
    if (!error) updateColumn({ id, title });
  };

  const options: TableOptions = {
    hasCheckbox: true,
    onRenameColumn,
    onRowClick: ({ id: memberId }: TableRow) => {
      showModal({ id: ModalType.MEMBER_PROFILE, metadata: memberId });
    }
  };

  return (
    <Table
      columns={columns}
      options={options}
      rows={rows}
      show={!!columns?.length}
    >
      <MemberDatabaseActions />
      <TableContent />
      <ModalLocal />
    </Table>
  );
};

export default MemberDatabase;
