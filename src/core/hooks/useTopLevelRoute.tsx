import { useHistory } from 'react-router-dom';

import { RouteType } from '@constants';
import { useStoreState } from '@store/Store';

/**
 * Returns the first active route of the community. Doesn't care about the
 * nested routes.
 *
 * @example /colorstack/membership => membership
 * @example /colorstack/membership/change => membership
 * @example /colorstack/analytics/dues => analytics
 */
const useTopLevelRoute = (): RouteType => {
  const urlName = useStoreState(({ db }) => db.community?.urlName);

  const { pathname } = useHistory().location;
  const route = pathname.slice(urlName?.length + 2);

  return route.includes('/')
    ? (route.slice(0, route.indexOf('/')) as RouteType)
    : (route as RouteType);
};

export default useTopLevelRoute;
