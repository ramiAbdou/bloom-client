import React from 'react';

import MainContent from '@containers/Main/Content';
import MainHeader from '@containers/Main/Header';
import ChangePlanModal from '../../modals/ChangePlan/ChangePlan';
import ChangePlanStore from './ChangePlan.store';
import PlanContainer from './containers/Plan';

const ChangePlan = () => {
  return (
    <ChangePlanStore.Provider>
      <MainHeader backButton title="Change Membership Plan" />

      <MainContent>
        <PlanContainer />
      </MainContent>

      <ChangePlanModal />
    </ChangePlanStore.Provider>
  );
};

export default ChangePlan;
