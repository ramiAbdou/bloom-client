import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import MainContent from '@components/containers/Main/MainContent';
import Scene from '@components/containers/Scene';
import { IMember, IQuestion } from '@util/constants.entities';
import DatabaseHeader from './DatabaseHeader';
import DatabaseTable from './DatabaseTable';

interface GetMembersByCommunityIdExpandedResult {
  members: IMember[];
  questions: IQuestion[];
}

const GET_MEMBERS_BY_COMMUNITY_ID_EXPANDED: DocumentNode = gql`
  query GetMembersByCommunityIdExpanded(
    $communityId: String!
    $roleExp: String_comparison_exp! = {}
    $searchString: String!
    $searchStringWord: String!
  ) {
    communityId @client @export(as: "communityId")
    databaseRoleExp @client @export(as: "roleExp")
    databaseSearchString @client @export(as: "searchString")
    databaseSearchStringWord @client @export(as: "searchStringWord")

    members(
      where: {
        communityId: { _eq: $communityId }
        deletedAt: { _is_null: true }
        role: $roleExp
        status: { _eq: "Accepted" }
        _or: [
          # { bio: { _ilike: $searchStringWord } }
          { email: { _ilike: $searchStringWord } }
          { firstName: { _ilike: $searchString } }
          { lastName: { _ilike: $searchString } }
        ]
      }
      limit: 25
      order_by: { joinedAt: desc }
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
    loading,
    error
  } = useQuery<GetMembersByCommunityIdExpandedResult>(
    GET_MEMBERS_BY_COMMUNITY_ID_EXPANDED
  );

  console.log('fetch database error', error);

  return (
    <Scene>
      <MainContent>
        <DatabaseHeader loading={loading} />
        <DatabaseTable {...data} />
      </MainContent>
    </Scene>
  );
};

export default Database;
