import React from 'react';

import CurrentPlanCard from './CurrentPlan';
import PaymentMethodCard from './PaymentMethod';

const MembershipCardContainer = () => {
  return (
    <div className="s-membership-manage-card-ctr">
      <CurrentPlanCard />
      <PaymentMethodCard />
    </div>
  );
};

export default MembershipCardContainer;
