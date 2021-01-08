import React from 'react';

import { MainContent, MainHeader } from '@containers/Main';
import CurrentPlanCard from './CurrentPlanCard';
import MembershipCardContainer from './MembershipCardContainer';
import PaymentMethodCard from './PaymentMethodCard';
import PaymentOverview from './PaymentOverview';

const ManageMembershipCardContainer: React.FC = () => (
  <MembershipCardContainer>
    <CurrentPlanCard />
    <PaymentMethodCard />
  </MembershipCardContainer>
);

const ManageMembership: React.FC = () => {
  return (
    <>
      <MainHeader title="Manage Membership" />

      <MainContent loading={false}>
        <ManageMembershipCardContainer />
        <PaymentOverview />
      </MainContent>
    </>
  );
};

export default ManageMembership;
