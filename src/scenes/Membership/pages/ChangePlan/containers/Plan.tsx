import React from 'react';

import PlanCard from '../components/Plan';

const PlanContainer = () => {
  return (
    <div className="s-membership-plans-card-ctr">
      <PlanCard />
      <PlanCard isCurrent />
      <PlanCard />
      <PlanCard />
    </div>
  );
};

export default PlanContainer;
