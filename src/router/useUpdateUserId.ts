import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';

import { IMember, MemberStatus } from '@db/db.entities';
import { SetActiveEntitesArgs } from '@db/db.types';
import useCustomQuery from '@gql/hooks/useCustomQuery';
import useFind from '@gql/hooks/useFind';
import { useStoreActions } from '@store/Store';

interface GetUserTokensResult {
  userId: string;
}

/**
 * Updates the authenticated status of the user by checking the decoded httpOnly
 * cookies stored in the browser.
 *
 * @param shouldRedirectToLogin - True if the Router should redirect to login if
 * there are no ID's (userId, etc.) present on the token.
 */
const useUpdateUserId = (): boolean => {
  const setActiveEntities: ActionCreator<
    SetActiveEntitesArgs | SetActiveEntitesArgs[]
  > = useStoreActions(({ db }) => db.setActiveEntities);

  const { data } = useCustomQuery<GetUserTokensResult>({
    fields: ['userId'],
    queryName: 'getUserTokens'
  });

  const userId: string = data?.userId;

  const members: IMember[] = useFind(IMember, {
    fields: ['community.id', 'community.urlName'],
    skip: !userId,
    where: { id: userId, status: MemberStatus.ACCEPTED }
  });

  useEffect(() => {
    // If the userId is decoded from the decoded token, then set the active
    // entities for the communities, members and users.
    if (userId) setActiveEntities({ userId });
  }, [userId]);

  return !members;
};

export default useUpdateUserId;
