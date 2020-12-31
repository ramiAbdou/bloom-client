import React from 'react';

import CurrentPlanCard from '../components/CurrentPlan';
import PaymentMethodCard from '../components/PaymentMethod';

const MembershipCardContainer = () => (
  <div className="s-membership-manage-card-ctr">
    <CurrentPlanCard />
    <PaymentMethodCard />
  </div>
);

export default MembershipCardContainer;
