import { gql } from '@apollo/client';

export interface GetMembersByCommunityIdArgs {
  communityId: string;
}

const GET_MEMBERS_BY_COMMUNITY_ID = gql`
  query GetMembersByCommunityId($communityId: String!) {
    members(where: { communityId: { _eq: $communityId } }) {
      bio
      email
      firstName
      id
      lastName
      joinedAt
      pictureUrl
      position
      role
      status
    }
  }
`;

export default GET_MEMBERS_BY_COMMUNITY_ID;
