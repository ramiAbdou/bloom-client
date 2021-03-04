import Cookies from 'js-cookie';
import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import useLoader from '@organisms/Loader/useLoader';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { CookieType } from '@util/constants';

/**
 * If a LOGIN_ERROR exists via cookie, then we need to load the community's
 * owner information.
 *
 * Uses global loading state.
 */
const useInitCheckInError = (): boolean => {
  const communityId = useStoreState(({ db }) => db.community?.id);
  const isMember = useStoreState(({ db }) => db.isMember);

  const [getCommunityOwner, { loading }] = useManualQuery<ICommunity>({
    fields: [
      'id',
      { owner: ['id', 'firstName', 'lastName', { user: ['id', 'email'] }] }
    ],
    operation: 'getCommunityOwner',
    schema: Schema.COMMUNITY,
    types: { communityId: { required: true } }
  });

  const hasCookieError = !!Cookies.get(CookieType.LOGIN_ERROR);

  useEffect(() => {
    (async () => {
      if (hasCookieError && communityId && !isMember) {
        await getCommunityOwner({ communityId });
      }
    })();
  }, [communityId, hasCookieError, isMember]);

  useLoader(loading);
  return loading;
};

export default useInitCheckInError;
