import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import MainContent from '@containers/Main/MainContent';
// import Row from '@containers/Row/Row';
import MembershipChangeList from './MembershipChangeList';
import MembershipCurrentPlan from './MembershipCurrentPlan';
// import MembershipExpiredCard from './MembershipExpiredCard';
import MembershipHeader from './MembershipHeader';
import MembershipPaymentHistory from './MembershipPaymentHistory';
import MembershipPaymentMethod from './MembershipPaymentMethod';
import MembershipRenewsCard from './MembershipRenewsCard';

const MembershipContent: React.FC = () => {
  return (
    <>
      {/* <Row className="mb-md" gap="xs"> */}
      {/* <MembershipExpiredCard /> */}
      <MembershipRenewsCard />
      {/* </Row> */}

      <div className="s-membership-card-ctr mb-md">
        <MembershipCurrentPlan />
        <MembershipPaymentMethod />
      </div>

      <MembershipPaymentHistory />
    </>
  );
};

const Membership: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <MainContent>
      <MembershipHeader />

      <Switch>
        <Route exact component={MembershipContent} path={url} />
        <Route exact component={MembershipChangeList} path={`${url}/change`} />
        <Redirect to={url} />
      </Switch>
    </MainContent>
  );
};

export default Membership;
