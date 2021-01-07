import React from 'react';

import MainContent from '@containers/Main/Content';
import MainHeader from '@containers/Main/Header';
import CurrentPlanCard from './CurrentPlanCard';
import MembershipCardContainer from './MembershipCardContainer';
import PaymentHistoryContainer from './PaymentHistory';
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
