import MainContent from 'core/templates/Main/Content';
import MainHeader from 'core/templates/Main/Header';
import React from 'react';

import MembershipCardContainer from './containers/Card';
import PaymentHistoryContainer from './containers/PaymentHistory';

const ManageMembership = () => {
  return (
    <>
      <MainHeader title="Manage Membership" />

      <MainContent>
        <MembershipCardContainer />
        <PaymentHistoryContainer />
      </MainContent>
    </>
  );
};

export default ManageMembership;
