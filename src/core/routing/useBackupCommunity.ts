import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { UrlNameProps } from '@constants';
import { useStoreState } from '@store/Store';
import { ICommunity, IMember } from '../store/Db/entities';

/**
 * Pushes the URL to a community that is known to the member (AKA to a
 * community) that they are a part of.
 *
 * All of the user's memberships are already loaded at this point.
 */
const useBackupCommunity = () => {
  const { urlName }: UrlNameProps = useParams();

  const { push } = useHistory();

  const backupUrlName: string = useStoreState(({ db }) => {
    if (!db.user?.members) return null;

    const memberId: string = db.user.members[0];
    const member: IMember = db.byMemberId[memberId];
    return db.byCommunityId[member.community]?.urlName;
  });

  const isMember: boolean = useStoreState(({ db }) => {
    return db.user?.members
      ?.map((memberId: string) => db.byMemberId[memberId])
      ?.some((member: IMember) => {
        const community: ICommunity = db.byCommunityId[member.community];
        return urlName === community.urlName;
      });
  });

  useEffect(() => {
    if (isMember === false) {
      push(`/${backupUrlName}`);
    }
  }, [isMember]);
};

export default useBackupCommunity;
