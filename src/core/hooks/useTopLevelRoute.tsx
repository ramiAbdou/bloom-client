import { useHistory } from 'react-router-dom';

import { RouteType } from '@util/constants';

/**
 * Returns the first active route of the community. Doesn't care about the
 * nested routes.
 *
 * @example /colorstack/membership => membership
 * @example /colorstack/membership/change => membership
 * @example /colorstack/analytics/dues => analytics
 */
const useTopLevelRoute = (urlName: string): RouteType => {
  const { pathname } = useHistory().location;

  const route = pathname.slice(urlName?.length + 2);

  return route.includes('/')
    ? (route.slice(0, route.indexOf('/')) as RouteType)
    : (route as RouteType);
};

export default useTopLevelRoute;
