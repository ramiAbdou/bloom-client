import React, { useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { IoExit } from 'react-icons/io5';
import { toastQueueVar, useToast } from 'src/App.reactive';

import {
  DocumentNode,
  gql,
  useLazyQuery,
  useReactiveVar
} from '@apollo/client';
import { useTableState } from '@components/organisms/Table/Table.state';
import {
  SortTableArgs,
  TableRow,
  TableState
} from '@components/organisms/Table/Table.types';
import useCommunityUrlName from '@core/hooks/useCommunityUrlName';
import { IMember, IQuestion } from '@util/constants.entities';
import { databaseSortArgsVar } from './Database.reactive';
import { useMemberDatabaseRows } from './Database.util';
import DatabaseAction from './DatabaseAction';

interface GetMembersFullDataArgs {
  idExp: Record<string, unknown>;
}

interface GetMembersFullDataResult {
  members: IMember[];
  questions: IQuestion[];
}

const GET_MEMBERS_FULL_DATA: DocumentNode = gql`
  query GetMembersFullData(
    $communityId: String!
    $idExp: String_comparison_exp!
    $orderByExp: [members_order_by!]
    $roleExp: String_comparison_exp! = {}
    $searchString: String!
    $searchStringWord: String!
  ) {
    communityId @client @export(as: "communityId")
    databaseOrderByExp @client @export(as: "orderByExp")
    databaseRoleExp @client @export(as: "roleExp")
    databaseSearchString @client @export(as: "searchString")
    databaseSearchStringWord @client @export(as: "searchStringWord")

    members(
      where: {
        _and: [
          { communityId: { _eq: $communityId } }
          { deletedAt: { _is_null: true } }
          { id: $idExp }
          { role: $roleExp }
          { status: { _eq: "Accepted" } }
          {
            _or: [
              { email: { _ilike: $searchStringWord } }
              { firstName: { _ilike: $searchString } }
              { lastName: { _ilike: $searchString } }
            ]
          }
        ]
      }
      order_by: $orderByExp
    ) {
      bio
      email
      firstName
      id
      lastName
      joinedAt
      role
      status

      memberSocials {
        facebookUrl
        instagramUrl
        linkedInUrl
      }

      memberType {
        name
      }

      memberValues {
        id
        questionId
        value
      }
    }

    questions(
      where: {
        category: { _neq: "DUES_STATUS" }
        communityId: { _eq: $communityId }
      }
      order_by: { rank: asc }
    ) {
      category
      id
      title
      type
    }
  }
`;

const DatabaseExportMembersButton: React.FC = () => {
  const [getMembersFullData, { loading, data }] = useLazyQuery<
    GetMembersFullDataResult,
    GetMembersFullDataArgs
  >(GET_MEMBERS_FULL_DATA);

  const {
    columns,
    isAllRowsSelected,
    selectedRowIds
  }: TableState = useTableState();

  const sortArgs: SortTableArgs = useReactiveVar(databaseSortArgsVar);
  const { showToast } = useToast(toastQueueVar);

  const urlName: string = useCommunityUrlName();
  const members: IMember[] = data?.members;
  const questions: IQuestion[] = data?.questions;

  const rows: TableRow[] = useMemberDatabaseRows({
    members,
    questions,
    sortColumnCategory: sortArgs?.column?.category,
    sortColumnId: sortArgs?.sortColumnId,
    sortDirection: sortArgs?.sortDirection
  });

  useEffect(() => {
    if (!rows.length) return;

    showToast({ message: 'Member(s) data exported.' });
  }, [rows]);

  // Formatted in a way that CSV Link can properly read it.
  const headers = columns.map(({ id, title }) => {
    return { key: id, label: title };
  });

  const csvData = rows.map(({ id: _, ...row }) => row);

  const onClick = (): void => {
    const idExp: Record<string, unknown> = isAllRowsSelected
      ? {}
      : { _in: selectedRowIds };

    getMembersFullData({ variables: { idExp } });
  };

  const fileName: string = `${urlName}.csv`;

  return (
    <CSVLink
      data={csvData}
      enclosingCharacter="`"
      filename={fileName}
      headers={headers}
      onClick={onClick}
    >
      <DatabaseAction
        Icon={IoExit}
        loading={loading}
        tooltip="Export Member Data"
      />
    </CSVLink>
  );
};

export default DatabaseExportMembersButton;
