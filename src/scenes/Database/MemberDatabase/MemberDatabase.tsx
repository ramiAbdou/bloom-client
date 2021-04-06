import day from 'dayjs';
import { ActionCreator } from 'easy-peasy';
import React from 'react';

import { IQuestion } from '@db/db.entities';
import { GQL } from '@gql/gql.types';
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
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, QuestionCategory } from '@util/constants';
import { sortObjects } from '@util/util';
import { useMemberDatabaseRows } from '../Database.util';
import MemberDatabaseActions from './MemberDatabaseActions';

const MemberDatabase: React.FC = () => {
  const canCollectDues: boolean = useStoreState(
    ({ db }) => db.community.canCollectDues
  );

  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const gql: GQL = useGQL();

  // Massage the member data into valid row data by mapping the question ID
  // to the value for each member.
  const rows: TableRow[] = useMemberDatabaseRows();

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
          format: (value: string) => day(value).format('MMMM, D, YYYY')
        };
      }

      return question;
    });
  });

  const onRenameColumn: RenameColumnFunction = async ({
    column,
    updateColumn
  }) => {
    const { title, id } = column;

    const { error } = await gql.questions.update({
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
