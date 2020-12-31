import React from 'react';

import ChangePlanHeader from './components/Header';
import PlanContainer from './containers/Plan';

const ChangePlan = () => {
  return (
    <>
      <ChangePlanHeader />

      <div className="s-home-content">
        <PlanContainer />
      </div>
    </>
  );
};

export default ChangePlan;
