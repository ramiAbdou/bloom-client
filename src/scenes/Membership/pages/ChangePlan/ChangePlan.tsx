import React from 'react';

import MainHeader from '@components/Main/Header';
import ChangePlanModal from '../../modals/ChangePlan/ChangePlan';
import ChangePlanStore from './ChangePlan.store';
import PlanContainer from './containers/Plan';

const ChangePlan = () => {
  return (
    <ChangePlanStore.Provider>
      <MainHeader backButton title="Change Membership Plan" />

      <div className="s-home-content">
        <PlanContainer />
      </div>

      <ChangePlanModal />
    </ChangePlanStore.Provider>
  );
};

export default ChangePlan;
