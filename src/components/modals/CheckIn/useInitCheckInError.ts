import Cookies from 'js-cookie';
import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import useLoader from '@organisms/Loader/useLoader';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { ErrorContext } from '@util/errors';

/**
 * If a LOGIN_ERROR exists via cookie, then we need to load the community's
 * owner information.
 *
 * Uses global loading state.
 */
const useInitCheckInError = (): boolean => {
  const communityId = useStoreState(({ db }) => db.community?.id);
  const isMember = useStoreState(({ db }) => db.isMember);

  const [getOwner, { loading }] = useManualQuery<ICommunity>({
    fields: [
      'id',
      'email',
      'firstName',
      'lastName',
      'role',
      { community: ['id'] }
    ],
    operation: 'getOwner',
    schema: Schema.MEMBER,
    types: { communityId: { required: true } }
  });

  const hasCookieError = !!Cookies.get(ErrorContext.LOGIN_ERROR);

  useEffect(() => {
    (async () => {
      if (hasCookieError && communityId && !isMember) {
        await getOwner({ communityId });
      }
    })();
  }, [communityId, hasCookieError, isMember]);

  useLoader(loading);
  return loading;
};

export default useInitCheckInError;
