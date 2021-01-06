import React from 'react';

import MainContent from '@containers/Main/Content';
import MainHeader from '@containers/Main/Header';
import ChangePlanStore from './ChangePlan.store';
import PlanContainer from './PlanContainer';

const ChangePlan = () => {
  return (
    <ChangePlanStore.Provider>
      <MainHeader backButton title="Change Membership Plan" />

      <MainContent>
        <PlanContainer />
      </MainContent>
    </ChangePlanStore.Provider>
  );
};

export default ChangePlan;
