import React from 'react';
import { Redirect, Route, RouteProps, useParams } from 'react-router-dom';

import { UrlNameProps } from '@constants';
import { useStoreState } from '@store/Store';

/**
 * For an authenticated route, we first try to retrieve the user (by using the
 * token stored in the httpOnly cookies), and if the user exists, we update
 * the global state with the user.
 */
const AdminRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const isAdmin: boolean = useStoreState(({ db }) => !!db.member?.role);
  const { urlName }: UrlNameProps = useParams();
  if (!isAdmin) return <Redirect to={`/${urlName}`} />;
  return <Route exact {...rest} component={component} />;
};

export default AdminRoute;
