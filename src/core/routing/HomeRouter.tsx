import React, { useEffect } from 'react';
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch
} from 'react-router-dom';

import { UrlNameProps } from '@constants';
// import useMutation from '@hooks/useMutation';
import AddMemberModal from '@modals/AddMember/AddMember';
import PaymentModal from '@modals/Payment/Payment';
import Loader from '@molecules/Loader/Loader';
import Nav from '@organisms/Nav/Nav';
import Analytics from '@scenes/Analytics/Analytics';
import Applicants from '@scenes/Applicants/Applicants';
import Database from '@scenes/Database/Database';
import Directory from '@scenes/Directory/Directory';
import Events from '@scenes/Events/Events';
import Integrations from '@scenes/Integrations/Integrations';
import Membership from '@scenes/Membership/Membership';
import { ICommunity, IMember } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import AdminRoute from './AdminRoute';
// import { CHANGE_COMMUNITY, ChangeCommunityArgs } from './Router.gql';

const HomeRouterContent: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <div className="home-content">
      <Switch>
        <Route component={Directory} path={`${url}/directory`} />
        <Route component={Events} path={`${url}/events`} />
        <AdminRoute component={Database} path={`${url}/database`} />
        <AdminRoute component={Analytics} path={`${url}/analytics`} />
        <AdminRoute component={Integrations} path={`${url}/integrations`} />
        <AdminRoute component={Applicants} path={`${url}/applicants`} />
        <Route component={Membership} path={`${url}/membership`} />
        <Redirect to={`${url}/directory`} />
      </Switch>
    </div>
  );
};

const HomeRouter: React.FC = () => {
  const { urlName } = useParams() as UrlNameProps;

  const activeUrlName = useStoreState(({ db }) => db.community?.urlName);

  const setActiveCommunity = useStoreActions(({ db }) => db.setActiveCommunity);

  // const [changeCommunity] = useMutation<boolean, ChangeCommunityArgs>({
  //   name: 'changeCommunity',
  //   query: CHANGE_COMMUNITY
  // });

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

  // useEffect(() => {
  //   if (isMember && activeEncodedUrlName !== urlName) {
  //     // changeCommunity({ memberId:  })
  //     setActiveCommunity({ urlName });
  //   }
  // }, [urlName, isMember]);

  // console.log(urlName);
  // console.log(isMember);
  // console.log(activeEncodedUrlName);

  // If the activeEncodedUrlName hasn't been set yet, that means the community
  // hasn't been loaded in the global state yet, so just wait...
  if (!activeUrlName) return <Loader />;

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
      <PaymentModal selectedTypeId={memberTypeId} type="PAY_DUES" />
    </>
  );
};

export default HomeRouter;
