import { useHistory } from 'react-router-dom';

import { ICommunity } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFindOneFull from '@gql/hooks/useFindOneFull';
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

  const { pathname } = useHistory().location;

  const { data: community, loading } = useFindOneFull(ICommunity, {
    fields: ['urlName'],
    where: { id: communityId }
  });

  if (loading) return null;

  const route = pathname.slice(community.urlName?.length + 2);

  return route.includes('/')
    ? (route.slice(0, route.indexOf('/')) as RouteType)
    : (route as RouteType);
};

export default useTopLevelRoute;
