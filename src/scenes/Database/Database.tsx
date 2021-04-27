import React, { useEffect } from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Scene from '@components/containers/Scene';
import { AggregateCount } from '@util/constants';
import { IMember, IQuestion } from '@util/constants.entities';
import { clearDatabaseReactiveFields } from './Database.reactive';
import DatabaseHeader from './DatabaseHeader';
import DatabaseTable from './DatabaseTable';

interface GetMembersByCommunityIdExpandedResult {
  members: IMember[];
  questions: IQuestion[];
  totalMembersCount: AggregateCount;
}

const GET_MEMBERS_BY_COMMUNITY_ID_EXPANDED: DocumentNode = gql`
  query GetMembersByCommunityIdExpanded(
    $communityId: String!
    $offset: Int!
    $orderByExp: [members_order_by!]
    $roleExp: String_comparison_exp! = {}
    $searchString: String!
    $searchStringWord: String!
  ) {
    communityId @client @export(as: "communityId")
    databaseOffset @client @export(as: "offset")
    databaseOrderByExp @client @export(as: "orderByExp")
    databaseRoleExp @client @export(as: "roleExp")
    databaseSearchString @client @export(as: "searchString")
    databaseSearchStringWord @client @export(as: "searchStringWord")

    totalMembersCount: members_aggregate(
      where: {
        communityId: { _eq: $communityId }
        deletedAt: { _is_null: true }
        role: $roleExp
        status: { _eq: "Accepted" }
        _or: [
          { email: { _ilike: $searchStringWord } }
          { firstName: { _ilike: $searchString } }
          { lastName: { _ilike: $searchString } }
        ]
      }
    ) {
      aggregate {
        count
      }
    }

    members(
      where: {
        communityId: { _eq: $communityId }
        deletedAt: { _is_null: true }
        role: $roleExp
        status: { _eq: "Accepted" }
        _or: [
          { email: { _ilike: $searchStringWord } }
          { firstName: { _ilike: $searchString } }
          { lastName: { _ilike: $searchString } }
        ]
      }
      limit: 50
      offset: $offset
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

const Database: React.FC = () => {
  const {
    data,
    error,
    loading
  } = useQuery<GetMembersByCommunityIdExpandedResult>(
    GET_MEMBERS_BY_COMMUNITY_ID_EXPANDED
  );

  useEffect(
    () => () => {
      clearDatabaseReactiveFields();
    },
    []
  );

  console.log(data?.members, error);

  return (
    <Scene>
      <DatabaseHeader loading={loading} />
      <DatabaseTable {...data} />
    </Scene>
  );
};

export default Database;
