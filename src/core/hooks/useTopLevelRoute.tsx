import { useHistory } from 'react-router-dom';

import { ICommunity } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import { useStoreState } from '@store/Store';
import { RouteType } from '@util/constants';

/**
 * Returns the first active route of the community. Doesn't care about the
 * nested routes.
 *
 * @example /colorstack/membership => membership
 * @example /colorstack/membership/change => membership
 * @example /colorstack/analytics/dues => analytics
 */
const useTopLevelRoute = (): RouteType => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { urlName } = useFindOne(ICommunity, {
    fields: ['urlName'],
    where: { id: communityId }
  });

  const { pathname } = useHistory().location;
  const route = pathname.slice(urlName?.length + 2);

  return route.includes('/')
    ? (route.slice(0, route.indexOf('/')) as RouteType)
    : (route as RouteType);
};

export default useTopLevelRoute;
