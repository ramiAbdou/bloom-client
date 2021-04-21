import { gql } from '@apollo/client';

export interface GetMembersByUserIdArgs {
  userId: string;
}

const GET_MEMBERS_BY_USER_ID = gql`
  query GetMembersByUserId($userId: String!) {
    members(where: { userId: { _eq: $userId } }) {
      id
      community {
        id
        logoUrl
        urlName
      }
    }
  }
`;

export default GET_MEMBERS_BY_USER_ID;
