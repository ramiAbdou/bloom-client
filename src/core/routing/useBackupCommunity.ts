import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { IUser } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import { useStoreState } from '@store/Store';
import { UrlNameProps } from '@util/constants';
import useIsMember from '../hooks/useIsMember';

/**
 * Pushes the URL to a community that is known to the member (AKA to a
 * community) that they are a part of.
 *
 * All of the user's memberships are already loaded at this point.
 */
const useBackupCommunity = (): boolean => {
  const userId: string = useStoreState(({ db }) => db.userId);

  const isMember: boolean = useIsMember();
  const { urlName }: UrlNameProps = useParams();
  const { push } = useHistory();

  const { members } = useFindOne(IUser, {
    fields: ['members.community.id', 'members.community.urlName', 'members.id'],
    where: { id: userId }
  });

  const backupUrlName: string = members ? members[0]?.community.urlName : null;

  useEffect(() => {
    if (backupUrlName && (!urlName || isMember === false)) {
      push(`/${backupUrlName}`);
    }
  }, [backupUrlName, isMember, urlName]);

  // While the urlName isn't set, it means this hook is still "loading".
  return !urlName;
};

export default useBackupCommunity;
