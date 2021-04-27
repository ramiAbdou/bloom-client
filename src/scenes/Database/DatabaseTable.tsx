import day from 'dayjs';
import React from 'react';

import { useReactiveVar } from '@apollo/client';
import Table from '@components/organisms/Table/Table';
import {
  OnApplyFiltersArgs,
  SortTableArgs,
  TableColumn,
  TableOptions,
  TableRow
} from '@components/organisms/Table/Table.types';
import { modalVar } from '@core/state/Modal.reactive';
import { AggregateCount, ModalType, QuestionCategory } from '@util/constants';
import { IMember, IMemberType, IQuestion } from '@util/constants.entities';
import {
  databaseFiltersVar,
  databaseOffsetVar,
  databaseSortArgsVar
} from './Database.reactive';
import { useMemberDatabaseRows } from './Database.util';
import DatabaseActionRow from './DatabaseActionRow';

interface DatabaseTableProps {
  members: IMember[];
  memberTypes: IMemberType[];
  questions: IQuestion[];
  totalMembersCount: AggregateCount;
}

const DatabaseTable: React.FC<DatabaseTableProps> = ({
  members,
  memberTypes,
  questions,
  totalMembersCount
}) => {
  const sortArgs: SortTableArgs = useReactiveVar(databaseSortArgsVar);

  members = members ?? [];
  questions = questions ?? [];

  // Massage the member data into valid row data by mapping the question ID
  // to the value for each member.
  const rows: TableRow[] = useMemberDatabaseRows({
    members,
    questions,
    sortColumnCategory: sortArgs?.column?.category,
    sortColumnId: sortArgs?.sortColumnId,
    sortDirection: sortArgs?.sortDirection
  });

  const columns: TableColumn[] = questions.map((question: IQuestion) => {
    if (question.category === QuestionCategory.JOINED_AT) {
      return {
        ...question,
        format: (value: string) => day(value).format('MMMM, D, YYYY')
      };
    }

    if (question.category === QuestionCategory.MEMBER_TYPE) {
      return {
        ...question,
        options: memberTypes.map((memberType: IMemberType) => memberType.name)
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

  const onApplyFilters = (args: OnApplyFiltersArgs) => {
    databaseFiltersVar(args);
  };

  const onOffsetChange = (offset: number): void => {
    databaseOffsetVar(offset);
  };

  const onSortColumn = (args: SortTableArgs): void => {
    databaseSortArgsVar(args);
  };

  const options: TableOptions = {
    hasCheckbox: true,
    // onRenameColumn,
    onRowClick: ({ id: memberId }: TableRow) => {
      modalVar({ id: ModalType.PROFILE, metadata: memberId });
    }
  };

  return (
    <Table
      columns={columns}
      options={options}
      rows={rows}
      totalCount={totalMembersCount.aggregate.count}
      onApplyFilters={onApplyFilters}
      onOffsetChange={onOffsetChange}
      onSortColumn={onSortColumn}
    >
      <DatabaseActionRow />
    </Table>
  );
};

export default DatabaseTable;
