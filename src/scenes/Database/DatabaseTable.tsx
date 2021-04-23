import day from 'dayjs';
import React from 'react';

import Table from '@components/organisms/Table/Table';
import {
  TableColumn,
  // RenameColumnFunction,
  // TableColumn,
  TableOptions,
  TableRow
} from '@components/organisms/Table/Table.types';
import TableContent from '@components/organisms/Table/TableContent';
import { modalVar } from '@core/state/Modal.reactive';
// import GQL from '@gql/GQL';
// import useGQL from '@gql/hooks/useGQL';
import { ModalType, QuestionCategory } from '@util/constants';
import { IMember, IQuestion } from '@util/constants.entities';
import { useMemberDatabaseRows } from './Database.util';
import MemberDatabaseActionRow from './MemberDatabaseActionRow';

interface DatabaseTableProps {
  members: IMember[];
  questions: IQuestion[];
}

const DatabaseTable: React.FC<DatabaseTableProps> = ({
  members,
  questions
}) => {
  members = members ?? [];
  questions = questions ?? [];

  // const gql: GQL = useGQL();

  // Massage the member data into valid row data by mapping the question ID
  // to the value for each member.
  const rows: TableRow[] = useMemberDatabaseRows({ members, questions });

  const columns: TableColumn[] = questions.map((question: IQuestion) => {
    if (question.category === QuestionCategory.JOINED_AT) {
      return {
        ...question,
        format: (value: string) => day(value).format('MMMM, D, YYYY')
      };
    }

    return question;
  });

  if (!questions?.length) return null;

  // const onRenameColumn: RenameColumnFunction = async ({
  //   column,
  //   updateColumn
  // }) => {
  //   // const { title, id } = column;
  //   // const { error } = await gql.update(IQuestion, {
  //   //   data: { title },
  //   //   where: { id }
  //   // });
  //   // if (!error) updateColumn({ id, title });
  // };

  console.log(rows);

  const options: TableOptions = {
    hasCheckbox: true,
    // onRenameColumn,
    onRowClick: ({ id: memberId }: TableRow) => {
      modalVar({ id: ModalType.PROFILE, metadata: memberId });
    }
  };

  return (
    <Table
      TableActions={MemberDatabaseActionRow}
      columns={columns}
      options={options}
    >
      <TableContent rows={rows} />
    </Table>
  );
};

export default DatabaseTable;
