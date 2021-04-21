import { gql } from '@apollo/client';

export interface GetMembersByCommunityIdArgs {
  communityId: string;
}

const GET_COMMUNITY_BY_ID = gql`
  query GetCommunityById($communityId: String!) {
    community(id: $communityId) {
      id
      name
      urlName
    }
  }
`;

export default GET_COMMUNITY_BY_ID;
