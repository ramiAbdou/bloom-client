import React, { useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch
} from 'react-router-dom';

import { UrlNameProps } from '@constants';
import useQuery from '@hooks/useQuery';
import useTopLevelRoute from '@hooks/useTopLevelRoute';
import AddMemberModal from '@modals/AddMember/AddMember';
import CreateEventModal from '@modals/CreateEvent/CreateEvent';
import PaymentModal from '@modals/Payment/Payment';
import Loader from '@molecules/Loader/Loader';
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
import { GET_USER, GetUserArgs, GetUserResult } from './Router.gql';
import TokenRoute from './TokenRoute';

const HomeRouterContent: React.FC = () => {
  const autoAccept = useStoreState(({ db }) => db.community.autoAccept);
  const { url } = useRouteMatch();

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

const HomeRouter = () => {
  const { urlName }: UrlNameProps = useParams();
  const route = useTopLevelRoute();
  const { url } = useRouteMatch();

  const params = useParams();
  console.log(params);

  const activeCommunityId = useStoreState(({ db }) => db.community?.id);
  const activeUrlName = useStoreState(({ db }) => db.community?.urlName);
  const isAuthenticated = useStoreState(({ db }) => db.isAuthenticated);

  const memberTypeId: string = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[db.member?.type]?.id;
  });

  const isMember: boolean = useStoreState(({ db }) => {
    const { byId: byCommunityId } = db.entities.communities;
    const { byId: byMemberId } = db.entities.members;

    const members: IMember[] = db.user?.members?.map((memberId: string) => {
      return byMemberId[memberId];
    });

    return members?.some((member) => {
      const community: ICommunity = byCommunityId[member.community];
      return urlName === community.urlName;
    });
  });

  const setActiveCommunity = useStoreActions(({ db }) => db.setActiveCommunity);

  const { loading, data, error } = useQuery<GetUserResult, GetUserArgs>({
    activeId: true,
    name: 'getUser',
    query: GET_USER,
    schema: Schema.USER,
    variables: { urlName }
  });

  const communityId = data?.activeCommunityId;

  useEffect(() => {
    if (!communityId) return;
    if (communityId !== activeCommunityId) setActiveCommunity(communityId);
  }, [communityId]);

  const token = new URLSearchParams(window.location.search).get('loginToken');
  if (token) return <TokenRoute token={token} />;

  if (!isAuthenticated && route === 'events') {
    return (
      <Switch>
        <Route component={IndividualEvent} path={`${url}/events/:eventId`} />
      </Switch>
    );
  }
  if (error) return <Redirect to="/login" />;
  if (loading || !activeUrlName) return <Loader />;

  // If the user isn't a member of the community who's URL we are currently
  // sitting at, then we redirect them to the first community that they are
  // a member of.
  if (!isMember) return <Redirect to={`/${activeUrlName}`} />;

  // If they are a member, just return the requested content.
  return (
    <>
      <Nav />
      <HomeRouterContent />
      <AddMemberModal />
      <CreateEventModal />
      <PaymentModal selectedTypeId={memberTypeId} type="PAY_DUES" />
    </>
  );
};

export default HomeRouter;
