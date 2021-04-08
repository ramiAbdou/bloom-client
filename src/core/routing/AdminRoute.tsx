import React from 'react';
import { Redirect, Route, RouteProps, useParams } from 'react-router-dom';

import { IMember } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import { useStoreState } from '@store/Store';
import { UrlNameProps } from '@util/constants';

/**
 * For an authenticated route, we first try to retrieve the user (by using the
 * token stored in the httpOnly cookies), and if the user exists, we update
 * the global state with the user.
 */
const AdminRoute: React.FC<RouteProps> = ({ component, ...rest }) => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { role } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  const { urlName }: UrlNameProps = useParams();

  // If role is undefined, means it hasn't been loaded yet.
  if (role === undefined) return null;

  // If role is null, means it has been loaded.
  if (role === null) return <Redirect to={`/${urlName}`} />;
  return <Route exact {...rest} component={component} />;
};

export default AdminRoute;
