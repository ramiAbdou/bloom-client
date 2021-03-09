import day from 'dayjs';
import React from 'react';

import ModalLocal from '@organisms/Modal/ModalLocal';
import Table from '@organisms/Table/Table';
import {
  OnRenameColumn,
  TableColumn,
  TableOptions,
  TableRow
} from '@organisms/Table/Table.types';
import TableContent from '@organisms/Table/TableContent';
import { IQuestion } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, QuestionCategory } from '@util/constants';
import { sortObjects } from '@util/util';
import { getMemberTableRow } from '../Database.util';
import MemberDatabaseActions from './MemberDatabaseActions';
import useUpdateQuestion from './useUpdateQuestion';

const MemberDatabase: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const canCollectDues: boolean = useStoreState(
    ({ db }) => db.community.canCollectDues
  );

  // Massage the member data into valid row data by mapping the question ID
  // to the value for each member.
  const rows: TableRow[] = useStoreState(({ db }) => getMemberTableRow({ db }));

  const columns: TableColumn[] = useStoreState(({ db }) => {
    const filteredColumns: TableColumn[] = db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.sort((a, b) => sortObjects(a, b, 'rank', 'ASC'))
      ?.filter((question: IQuestion) => {
        if (
          question.category === QuestionCategory.DUES_STATUS &&
          !canCollectDues
        ) {
          return false;
        }

        return true;
      });

    return filteredColumns?.map((question: IQuestion) => {
      if (question.category === QuestionCategory.DUES_STATUS) {
        return {
          ...question,
          format: (value: boolean) => (value ? 'Paid' : 'Not Paid')
        };
      }

      if (question.category === QuestionCategory.JOINED_AT) {
        return {
          ...question,
          format: (value) => day(value).format('MMMM, D, YYYY')
        };
      }

      return question;
    });
  });

  const updateQuestion = useUpdateQuestion();

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
