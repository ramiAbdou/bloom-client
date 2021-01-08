import React from 'react';

import { MainContent, MainHeader } from '@containers/Main';
import PlanContainer from './ChangePlanContainer';

const ChangeMembership: React.FC = () => {
  return (
    <>
      <MainHeader backButton title="Change Membership Plan" />

      <MainContent loading={false}>
        <PlanContainer />
      </MainContent>
    </>
  );
};

export default ChangeMembership;
