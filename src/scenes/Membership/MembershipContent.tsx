import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { LoadingProps } from '@constants';
import MainContent from '@containers/Main/MainContent';
import MainHeader, { MainHeaderProps } from '@containers/Main/MainHeader';
import useFinalPath from '@hooks/useFinalPath';
import MembershipChangeContainer from './MembershipChangeContainer';
import MembershipCurrentPlan from './MembershipCurrentPlan';
import MembershipPaymentMethod from './MembershipPaymentMethod';
import PaymentOverview from './MembershipPaymentOverview';

const MembershipHeader: React.FC<LoadingProps> = ({ loading }) => {
  const isChangePlan = useFinalPath() === 'change';

  const headerOptions: MainHeaderProps = {
    backButton: isChangePlan,
    loading,
    title: isChangePlan ? 'Change Membership Plan' : 'Manage Membership'
  };

  return <MainHeader {...headerOptions} />;
};

const ManageMembershipContent: React.FC = () => (
  <>
    <div className="s-membership-card-ctr">
      <MembershipCurrentPlan />
      <MembershipPaymentMethod />
    </div>

    <PaymentOverview />
  </>
);

const MembershipContent: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <MainContent>
      <MembershipHeader loading={false} />

      <Switch>
        <Route exact component={ManageMembershipContent} path={url} />
        <Route
          exact
          component={MembershipChangeContainer}
          path={`${url}/change`}
        />
        <Redirect to={url} />
      </Switch>
    </MainContent>
  );
};

export default MembershipContent;
