import { useHistory } from 'react-router-dom';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import { ICommunity } from '@util/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
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
  const communityId: string = useReactiveVar(communityIdVar);

  const { pathname } = useHistory().location;

  const { data: community, loading } = useFindOne(ICommunity, {
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
