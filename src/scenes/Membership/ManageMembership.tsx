import React from 'react';

import MainContent from '@containers/Main/Content';
import MainHeader from '@containers/Main/Header';
import CurrentPlanCard from './CurrentPlanCard';
import PaymentHistoryContainer from './PaymentHistory';
import PaymentMethodCard from './PaymentMethodCard';

const MembershipCardContainer: React.FC = () => {
  return (
    <div className="s-membership-card-ctr">
      <CurrentPlanCard />
      <PaymentMethodCard />
    </div>
  );
};

const ManageMembership: React.FC = () => {
  return (
    <>
      <MainHeader title="Manage Membership" />

      <MainContent>
        <MembershipCardContainer />
        <PaymentHistoryContainer />
      </MainContent>
    </>
  );
};

export default ManageMembership;
