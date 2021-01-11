import React from 'react';
import { Redirect, Route, RouteProps, useParams } from 'react-router-dom';

import { UrlNameProps } from '@constants';
import useBreakpoint from '@hooks/useBreakpoint';
import { useStoreState } from '@store/Store';

/**
 * For an authenticated route, we first try to retrieve the user (by using the
 * token stored in the httpOnly cookies), and if the user exists, we update
 * the global state with the user.
 */
export default ({ component, ...rest }: RouteProps) => {
  const isAdmin: boolean = useStoreState(({ db }) => db.isAdmin);

  const { urlName } = useParams() as UrlNameProps;
  const isDesktop = useBreakpoint() >= 3;

  if (!isDesktop || !isAdmin) return <Redirect to={`/${urlName}`} />;
  return <Route exact {...rest} component={component} />;
};
