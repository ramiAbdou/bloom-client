import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { LoadingProps } from '@constants';
import { MainContent } from '@containers/Main';
import MainHeader, { MainHeaderProps } from '@containers/Main/MainHeader';
import useFinalPath from '@hooks/useFinalPath';
import ChangePlanContainer from './ChangePlanContainer';
import MembershipCardContainer from './MembershipCardContainer';
import MembershipCurrentPlan from './MembershipCurrentPlan';
import MembershipPaymentMethod from './MembershipPaymentMethod';
import PaymentOverview from './PaymentOverview';

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
    <MembershipCardContainer>
      <MembershipCurrentPlan />
      <MembershipPaymentMethod />
    </MembershipCardContainer>

    <PaymentOverview />
  </>
);

const MembershipContent: React.FC = () => {
  const { url } = useRouteMatch();

  return (
    <MainContent Header={MembershipHeader} loading={false}>
      <Switch>
        <Route exact component={ManageMembershipContent} path={url} />
        <Route exact component={ChangePlanContainer} path={`${url}/change`} />
        <Redirect to={url} />
      </Switch>
    </MainContent>
  );
};

export default MembershipContent;
