import React, { useEffect } from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import Show from '@containers/Show';
import useFinalPath from '@hooks/useFinalPath';
import useQuery from '@hooks/useQuery';
import useTopLevelRoute from '@hooks/useTopLevelRoute';
import useLoader from '@organisms/Loader/useLoader';
import Nav from '@organisms/Nav/Nav';
import Analytics from '@scenes/Analytics/Analytics';
import Applicants from '@scenes/Applicants/Applicants';
import Database from '@scenes/Database/Database';
import Directory from '@scenes/Directory/Directory';
import Events from '@scenes/Events/Events';
import IndividualEvent from '@scenes/Events/IndividualEvent/IndividualEvent';
import Integrations from '@scenes/Integrations/Integrations';
import Membership from '@scenes/Membership/Membership';
import Profile from '@scenes/Profile/Profile';
import { IUser } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_USER } from '../store/Db/Db.gql';
import AdminRoute from './AdminRoute';
import useInitCommunity from './useInitCommunity';
import useKnownCommunity from './useKnownCommunity';

const HomeRouteContent: React.FC = () => {
  const isInitialized: boolean = useStoreState(({ db }) => {
    return !!db.community && !!db.member && !!db.user;
  });

  const autoAccept = useStoreState(({ db }) => db.community?.autoAccept);

  const { url } = useRouteMatch();
  useKnownCommunity();
  const loading = useInitCommunity();
  useLoader(loading);

  return (
    <Show show={isInitialized && !loading && url !== '/'}>
      <Nav />

      <div className="home-content">
        <Switch>
          <Route component={Directory} path={`${url}/directory`} />
          <Route component={Events} path={`${url}/events`} />
          <AdminRoute component={Database} path={`${url}/database`} />
          <AdminRoute component={Analytics} path={`${url}/analytics`} />
          <AdminRoute component={Integrations} path={`${url}/integrations`} />

          {!autoAccept && (
            <AdminRoute component={Applicants} path={`${url}/applicants`} />
          )}

          <Route component={Membership} path={`${url}/membership`} />
          <Route component={Profile} path={`${url}/profile`} />
          <Redirect to={`${url}/directory`} />
        </Switch>
      </div>
    </Show>
  );
};

const HomeRoute: React.FC = () => {
  const route = useTopLevelRoute();
  const { url } = useRouteMatch();
  const finalPath = useFinalPath();

  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);
  const setActive = useStoreActions(({ db }) => db.setActive);

  const { loading, data, error } = useQuery<IUser>({
    operation: 'getUser',
    query: GET_USER,
    schema: Schema.USER,
    variables: { populate: ['members.community'] }
  });

  useEffect(() => {
    if (data) setActive({ id: data.id, table: 'users' });
  }, [data]);

  useLoader(loading);

  if (
    !isAuthenticated &&
    route === 'events' &&
    !['past', 'upcoming'].includes(finalPath)
  ) {
    return (
      <Switch>
        <Route
          exact
          component={IndividualEvent}
          path={`${url}/events/:eventId`}
        />
      </Switch>
    );
  }

  if (error) return <Redirect to="/login" />;

  // If they are a member, just return the requested content.
  return (
    <Show show={isAuthenticated}>
      <HomeRouteContent />
    </Show>
  );
};

export default HomeRoute;
