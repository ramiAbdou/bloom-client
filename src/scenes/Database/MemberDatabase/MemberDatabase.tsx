import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Table from '@components/organisms/Table/Table';
import {
  // RenameColumnFunction,
  // TableColumn,
  TableOptions,
  TableRow
} from '@components/organisms/Table/Table.types';
import TableContent from '@components/organisms/Table/TableContent';
import { modalVar } from '@core/state/Modal.reactive';
// import GQL from '@gql/GQL';
// import useGQL from '@gql/hooks/useGQL';
import { ModalType } from '@util/constants';
import { IMember, IQuestion } from '@util/constants.entities';
import { useMemberDatabaseRows } from '../Database.util';
import MemberDatabaseActionRow from './MemberDatabaseActionRow';

interface GetMembersByCommunityIdExpandedResult {
  members: IMember[];
  questions: IQuestion[];
}

const GET_MEMBERS_BY_COMMUNITY_ID_EXPANDED: DocumentNode = gql`
  query GetMembersByCommunityIdExpanded(
    $communityId: String!
    $searchString: String!
    $searchStringWord: String!
  ) {
    communityId @client @export(as: "communityId")
    databaseSearchString @client @export(as: "searchString")
    databaseSearchStringWord @client @export(as: "searchStringWord")

    members(
      where: {
        communityId: { _eq: $communityId }
        deletedAt: { _is_null: true }
        status: { _eq: "Accepted" }
        _or: [
          # { bio: { _ilike: $searchStringWord } }
          { email: { _ilike: $searchStringWord } }
          { firstName: { _ilike: $searchString } }
          { lastName: { _ilike: $searchString } }
        ]
      }
      limit: 25
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
        value

        question {
          category
          id
        }
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

const MemberDatabase: React.FC = () => {
  const { data, error } = useQuery<GetMembersByCommunityIdExpandedResult>(
    GET_MEMBERS_BY_COMMUNITY_ID_EXPANDED
  );

  const questions: IQuestion[] = data?.questions ?? [];

  console.log(error);
  // const gql: GQL = useGQL();

  // Massage the member data into valid row data by mapping the question ID
  // to the value for each member.
  const rows: TableRow[] = useMemberDatabaseRows({ data: data?.members ?? [] });
  // const columns: TableColumn[] = useMemberDatabaseColumns();

  if (!questions?.length) return null;

  // console.log(rows);

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
      columns={questions}
      options={options}
    >
      <TableContent rows={rows} />
    </Table>
  );
};

export default MemberDatabase;
