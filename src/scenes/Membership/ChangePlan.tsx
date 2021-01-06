import React from 'react';

import MainContent from '@containers/Main/Content';
import MainHeader from '@containers/Main/Header';
import PlanContainer from './ChangePlanContainer';

const ChangePlan = () => {
  return (
    <>
      <MainHeader backButton title="Change Membership Plan" />

      <MainContent>
        <PlanContainer />
      </MainContent>
    </>
  );
};

export default ChangePlan;
