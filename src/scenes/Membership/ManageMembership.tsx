import React from 'react';

import { MainContent, MainHeader } from '@containers/Main';
import CurrentPlanCard from './CurrentPlanCard';
import MembershipCardContainer from './MembershipCardContainer';
import PaymentHistoryContainer from './MembershipPaymentOverview';
import PaymentMethodCard from './PaymentMethodCard';

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

      <MainContent>
        <ManageMembershipCardContainer />
        <PaymentHistoryContainer />
      </MainContent>
    </>
  );
};

export default ManageMembership;
