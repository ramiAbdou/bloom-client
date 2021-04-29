import day from 'dayjs';
import React from 'react';

import { useReactiveVar } from '@apollo/client';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@components/organisms/Modal/Modal.types';
import Table from '@components/organisms/Table/Table';
import {
  OnApplyFiltersArgs,
  SortTableArgs,
  TableColumn,
  TableOptions,
  TableRow
} from '@components/organisms/Table/Table.types';
import { AggregateCount, QuestionCategory } from '@util/constants';
import { IMember, IMemberType, IQuestion } from '@util/constants.entities';
import {
  databaseFiltersVar,
  databaseOffsetVar,
  databaseSortArgsVar
} from './Database.reactive';
import { useMemberDatabaseRows } from './Database.util';
import DatabaseActionRow from './DatabaseActionRow';
import useUpdateQuestionTitle from './useUpdateQuestionTitle';

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
  const updateQuestionTitle = useUpdateQuestionTitle();
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

  const onApplyFilters = (args: OnApplyFiltersArgs): void => {
    databaseFiltersVar(args);
  };

  const onOffsetChange = (offset: number): void => {
    databaseOffsetVar(offset);
  };

  const onRowClick = ({ id: memberId }: TableRow): void => {
    showModal({ id: ModalType.VIEW_PROFILE, metadata: memberId });
  };

  const onSortColumn = (args: SortTableArgs): void => {
    databaseSortArgsVar(args);
  };

  const options: TableOptions = { hasCheckbox: true };

  return (
    <Table
      columns={columns}
      options={options}
      rows={rows}
      totalCount={totalMembersCount.aggregate.count}
      onApplyFilters={onApplyFilters}
      onOffsetChange={onOffsetChange}
      onRenameColumn={updateQuestionTitle}
      onRowClick={onRowClick}
      onSortColumn={onSortColumn}
    >
      <DatabaseActionRow />
    </Table>
  );
};

export default DatabaseTable;
