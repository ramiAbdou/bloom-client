import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import MainContent from '@containers/Main/MainContent';
import MembershipChangeList from './MembershipChangeList';
import MembershipCurrentPlan from './MembershipCurrentPlan';
import MembershipHeader from './MembershipHeader';
import MembershipPaymentMethod from './MembershipPaymentMethod';
import PaymentOverview from './MembershipPaymentOverview';

const MembershipContent: React.FC = () => {
  return (
    <>
      <div className="s-membership-card-ctr">
        <MembershipCurrentPlan />
        <MembershipPaymentMethod />
      </div>

      <PaymentOverview />
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
