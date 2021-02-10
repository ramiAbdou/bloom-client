import React, { useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch
} from 'react-router-dom';

import { UrlNameProps } from '@constants';
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
import { ICommunity, IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import AdminRoute from './AdminRoute';
import {
  GET_INTEGRATIONS,
  GET_QUESTIONS,
  GET_TYPES,
  GET_USER,
  GetUserArgs,
  GetUserResult
} from './Router.gql';

const HomeRouteContent: React.FC = () => {
  const autoAccept = useStoreState(({ db }) => db.community.autoAccept);

  const { url } = useRouteMatch();

  const { loading: loading1 } = useQuery({
    name: 'getQuestions',
    query: GET_QUESTIONS,
    schema: [Schema.QUESTION]
  });

  const { loading: loading2 } = useQuery({
    name: 'getTypes',
    query: GET_TYPES,
    schema: [Schema.MEMBER_TYPE]
  });

  const { loading: loading3 } = useQuery({
    name: 'getIntegrations',
    query: GET_INTEGRATIONS,
    schema: Schema.COMMUNITY_INTEGRATIONS
  });

  const loading = loading1 || loading2 || loading3;
  useLoader(loading);

  if (loading) return null;

  return (
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
  );
};

const HomeRoute: React.FC = () => {
  const { urlName }: UrlNameProps = useParams();
  const route = useTopLevelRoute();
  const { url } = useRouteMatch();
  const finalPath = useFinalPath();

  const activeCommunityId = useStoreState(({ db }) => db.community?.id);
  const activeUrlName = useStoreState(({ db }) => db.community?.urlName);
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);

  const isMember: boolean = useStoreState(({ db }) => {
    const members: IMember[] = db.user?.members?.map((memberId: string) => {
      return db.byMemberId[memberId];
    });

    return members?.some((member) => {
      const community: ICommunity = db.byCommunityId[member.community];
      return urlName === community.urlName;
    });
  });

  const setActive = useStoreActions(({ db }) => db.setActive);

  const { loading, data, error } = useQuery<GetUserResult, GetUserArgs>({
    name: 'getUser',
    query: GET_USER,
    schema: Schema.USER,
    variables: { urlName }
  });

  // const communityId = data?.activeCommunityId;

  useEffect(() => {
    if (data) {
      setActive({ id: data.id, table: 'users' });
    }
    // if (communityId && communityId !== activeCommunityId) {
    //   setActiveCommunity(communityId);
    // }
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
  if (loading || !activeUrlName) return null;

  // If the user isn't a member of the community who's URL we are currently
  // sitting at, then we redirect them to the first community that they are
  // a member of.
  if (!isMember) return <Redirect to={`/${activeUrlName}`} />;

  // If they are a member, just return the requested content.
  return (
    <>
      <Nav />
      <HomeRouteContent />
    </>
  );
};

export default HomeRoute;
