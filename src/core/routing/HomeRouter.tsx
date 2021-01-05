import React from 'react';
import {
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch
} from 'react-router-dom';

import FullScreenLoader from '@components/Loader/FullScreenLoader';
import { EncodedUrlNameProps } from '@constants';
import DuesModal from '@modals/DuesModal/DuesModal';
import Analytics from '@scenes/Analytics/Analytics';
import Applicants from '@scenes/Applicants/Applicants';
import Database from '@scenes/Database/Database';
import Directory from '@scenes/Directory/Directory';
import Events from '@scenes/Events/Events';
import Integrations from '@scenes/Integrations/Integrations';
import Membership from '@scenes/Membership/Membership';
import { useStoreState } from '@store/Store';
import AddMemberModal from '../modals/AddMember/AddMember';
import Nav from '../organisms/Nav';
import SidebarPanel from '../organisms/Nav/SideBar/Picker';
import AdminRoute from './AdminRoute';

const HomeRouterContent: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <div className="s-home">
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
  const { encodedUrlName } = useParams() as EncodedUrlNameProps;

  const activeEncodedUrlName = useStoreState(
    ({ db }) => db.community?.encodedUrlName
  );

  const isMember: boolean = useStoreState(({ db }) => {
    const { byId: byCommunityId } = db.entities.communities;
    const { byId: byMemberId } = db.entities.members;

    return Object.values(byMemberId).some(({ community }) => {
      return encodedUrlName === byCommunityId[community]?.encodedUrlName;
    });
  });

  // If the activeEncodedUrlName hasn't been set yet, that means the community
  // hasn't been loaded in the global state yet, so just wait...
  if (!activeEncodedUrlName) return <FullScreenLoader />;

  // If the user isn't a member of the community who's URL we are currently
  // sitting at, then we redirect them to the first community that they are
  // a member of.
  if (!isMember) return <Redirect to={activeEncodedUrlName} />;

  // If they are a member, just return the requested content.
  return (
    <>
      <div className="s-home-ctr">
        <Nav />
        <HomeRouterContent />
      </div>

      <SidebarPanel />
      <AddMemberModal />
      <DuesModal />
    </>
  );
};

export default HomeRouter;
