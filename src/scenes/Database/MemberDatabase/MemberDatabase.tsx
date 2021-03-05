import React from 'react';

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
import { ModalType, QuestionCategory } from '@util/constants';
import { sortObjects } from '@util/util';
import { UpdateQuestionArgs } from '../Database.types';
import { getMemberTableRow } from '../Database.util';
import MemberDatabaseActions from './MemberDatabaseActions';

const MemberDatabase: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  // Massage the member data into valid row data by mapping the question ID
  // to the value for each member.
  const rows: TableRow[] = useStoreState(({ db }) => getMemberTableRow({ db }));

  const columns: TableColumn[] = useStoreState(({ db }) => {
    const integrationsId: string = db.community?.integrations;
    const integrations: IIntegrations = db.byIntegrationsId[integrationsId];

    const questions: IQuestion[] = db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.sort((a, b) => sortObjects(a, b, 'rank', 'ASC'))
      ?.filter((question: IQuestion) => {
        if (
          question.category === QuestionCategory.DUES_STATUS &&
          !integrations.stripeAccountId
        ) {
          return false;
        }

        return true;
      });

    return [...questions];
  });

  const [updateQuestion] = useMutation<IQuestion, UpdateQuestionArgs>({
    fields: ['id', 'title'],
    operation: 'updateQuestion',
    schema: Schema.QUESTION,
    types: { questionId: { required: true }, title: { required: true } }
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
      showModal({ id: ModalType.PROFILE, metadata: memberId });
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
