import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { IMember } from '@db/db.entities';
import useFind from '@gql/hooks/useFind';
import { useStoreState } from '@store/Store';

const CatchAllRoute: React.FC<Pick<RouteProps, 'exact' | 'path'>> = ({
  exact,
  path
}) => {
  const userId: string = useStoreState(({ db }) => db.userId);

  const members: IMember[] = useFind(IMember, {
    fields: ['community.id', 'community.urlName'],
    skip: !userId,
    where: { userId }
  });

  if (!userId) return <Redirect to="/login" />;

  console.log(members.length && members[0]?.community?.urlName);
  if (members?.length) {
    return <Redirect to={`/${members[0]?.community?.urlName}/directory`} />;
  }

  return (
    // 1. if the user is not authenticated, should redirect to login
    // 2. if the user is logged in

    <Route component={null} exact={exact} path={path} />
  );
};

export default CatchAllRoute;
