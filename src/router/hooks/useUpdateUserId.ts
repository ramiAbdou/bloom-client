import { useEffect } from 'react';
import { userIdVar } from 'src/App.reactive';

import { DocumentNode, gql, useQuery, useReactiveVar } from '@apollo/client';

interface GetUserTokensResult {
  getUserTokens: { userId: string };
}

const GET_USER_TOKENS: DocumentNode = gql`
  query GetUserTokens {
    getUserTokens {
      userId
    }
  }
`;

/**
 * Updates the authenticated status of the user by checking the decoded httpOnly
 * cookies stored in the browser.
 */
const useUpdateUserId = (): boolean => {
  const { data, loading } = useQuery<GetUserTokensResult>(GET_USER_TOKENS);

  const userId: string = data?.getUserTokens?.userId;
  const storedUserId: string = useReactiveVar(userIdVar);

  useEffect(() => {
    // If the userId is decoded from the decoded token, then set the active
    // entities for the communities, members and users.
    if (userId) userIdVar(userId);
  }, [userId]);

  return loading || (!!userId && userId !== storedUserId);
};

export default useUpdateUserId;
