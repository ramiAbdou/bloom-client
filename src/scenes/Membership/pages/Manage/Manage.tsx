import React from 'react';

import CurrentPlanCard from './components/CurrentPlan';
import MembershipHeader from './components/Header';
import PaymentMethodCard from './components/PaymentMethod';

const ManageMembership = () => {
  return (
    <>
      <MembershipHeader />

      <div className="s-home-content">
        <div className="s-membership-manage-card-ctr">
          <CurrentPlanCard />
          <PaymentMethodCard />
        </div>
      </div>
    </>
  );
};

export default ManageMembership;
