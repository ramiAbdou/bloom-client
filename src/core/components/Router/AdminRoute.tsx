/**
 * @fileoverview Component: AdminRoute
 * @author Rami Abdou
 */

import React from 'react';
import { Redirect, Route, RouteProps, useParams } from 'react-router-dom';

import { EncodedUrlNameParams } from '@constants';
import { useStoreState } from '@store/Store';

/**
 * For an authenticated route, we first try to retrieve the user (by using the
 * token stored in the httpOnly cookies), and if the user exists, we update
 * the global state with the user.
 */
export default ({ component, ...rest }: RouteProps) => {
  const { encodedUrlName } = useParams() as EncodedUrlNameParams;
  const isDesktop = useStoreState(({ screen }) => screen.isDesktop);
  const isAdmin: boolean = useStoreState(({ communities, memberships }) => {
    return Object.values(memberships.byId).some(
      ({ community, role }) =>
        !!role && encodedUrlName === communities.byId[community]?.encodedUrlName
    );
  });

  if (!isDesktop || !isAdmin) return <Redirect to={`/${encodedUrlName}`} />;
  return <Route exact {...rest} component={component} />;
};
