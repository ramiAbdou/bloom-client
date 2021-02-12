import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { UrlNameProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { ICommunity, IMember } from '../store/Db/entities';

/**
 * Pushes the URL to a community that is known to the member (AKA to a
 * community) that they are a part of.
 *
 * All of the user's memberships are already loaded at this point.
 */
const useKnownCommunity = () => {
  const { urlName }: UrlNameProps = useParams();

  const { push } = useHistory();
  const setActive = useStoreActions(({ db }) => db.setActive);

  const backupUrlName: string = useStoreState(({ db }) => {
    if (!db.user?.members) return null;

    const memberId: string = db.user.members[0];
    const member: IMember = db.byMemberId[memberId];
    return db.byCommunityId[member.community]?.urlName;
  });

  const communityId: string = useStoreState(({ db }) => {
    return db.user?.members
      ?.map((memberId: string) => {
        const member: IMember = db.byMemberId[memberId];
        return db.byCommunityId[member?.community];
      })
      ?.find((element: ICommunity) => element.urlName === urlName)?.id;
  });

  const memberId: string = useStoreState(({ db }) => {
    return db.user?.members?.find((elementId: string) => {
      const member: IMember = db.byMemberId[elementId];
      return db.byCommunityId[member?.community]?.urlName === urlName;
    });
  });

  const isMember: boolean = useStoreState(({ db }) => {
    const members: IMember[] = db.user?.members?.map((elementId: string) => {
      return db.byMemberId[elementId];
    });

    return members?.some((member) => {
      const community: ICommunity = db.byCommunityId[member.community];
      return urlName === community.urlName;
    });
  });

  useEffect(() => {
    if (!communityId || !memberId) return;
    setActive({ id: communityId, table: 'communities' });
    setActive({ id: memberId, table: 'members' });
  }, [communityId, memberId]);

  useEffect(() => {
    if (isMember === false) push(`/${backupUrlName}`);
  }, [isMember]);
};

export default useKnownCommunity;
