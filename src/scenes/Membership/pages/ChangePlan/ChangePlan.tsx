import React from 'react';

import MainContent from '@templates/Main/Content';
import MainHeader from '@templates/Main/Header';
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
