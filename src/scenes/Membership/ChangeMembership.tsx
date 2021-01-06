import React from 'react';

import MainContent from '@containers/Main/Content';
import MainHeader from '@containers/Main/Header';
import PlanContainer from './ChangePlanContainer';

const ChangeMembership: React.FC = () => {
  return (
    <>
      <MainHeader backButton title="Change Membership Plan" />

      <MainContent>
        <PlanContainer />
      </MainContent>
    </>
  );
};

export default ChangeMembership;
