import Cookies from 'js-cookie';
import { useEffect } from 'react';

import { ICommunity, Schema } from '@db/db.entities';
import { QueryResult } from '@gql/gql.types';
import useManualQuery from '@gql/useManualQuery';
import useLoader from '@organisms/Loader/useLoader';
import { useStoreState } from '@store/Store';
import { ErrorContext } from '@util/constants.errors';
import { QueryEvent } from '@util/constants.events';

/**
 * If a LOGIN_ERROR exists via cookie, then we need to load the community's
 * owner information.
 *
 * Uses global loading state.
 */
const useInitCheckInError = (): Partial<QueryResult> => {
  const communityId: string = useStoreState(({ db }) => db.community?.id);
  const isMember: boolean = useStoreState(({ db }) => db.isMember);

  const [getOwner, { loading }] = useManualQuery<ICommunity>({
    fields: [
      'id',
      'email',
      'firstName',
      'lastName',
      'role',
      { community: ['id'] }
    ],
    operation: QueryEvent.GET_OWNER,
    schema: Schema.MEMBER,
    types: { communityId: { required: true } }
  });

  const hasCookieError: boolean = !!Cookies.get(ErrorContext.LOGIN_ERROR);

  useEffect(() => {
    (async () => {
      if (hasCookieError && communityId && !isMember) {
        await getOwner({ communityId });
      }
    })();
  }, [communityId, hasCookieError, isMember]);

  useLoader(loading);

  return { loading };
};

export default useInitCheckInError;
