import React from 'react';

import MainContent from '@templates/Main/Content';
import MainHeader from '@templates/Main/Header';
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
