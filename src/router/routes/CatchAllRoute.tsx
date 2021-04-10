import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { IMember } from '@core/db/db.entities';
import useFindFull from '@core/gql/hooks/useFindFull';
import { useStoreState } from '@core/store/Store';

const CatchAllRoute: React.FC<Pick<RouteProps, 'exact' | 'path'>> = ({
  exact,
  path
}) => {
  const userId: string = useStoreState(({ db }) => db.userId);

  const { data: members } = useFindFull(IMember, {
    fields: ['community.id', 'community.urlName'],
    skip: !userId, // Only fire query if userId is present.
    where: { userId }
  });

  // If userId isn't present, means the user isn't logged in, so redirect
  // the user to the login page.
  if (!userId) return <Redirect to="/login" />;

  // If the members of the user have loaded, redirect them to the first
  // community that loads.
  if (members?.length) {
    const { urlName } = members[0].community;
    return <Redirect to={`/${urlName}/directory`} />;
  }

  // Otherwise, return a Route that is null until our queries finish.
  return <Route component={null} exact={exact} path={path} />;
};

export default CatchAllRoute;
