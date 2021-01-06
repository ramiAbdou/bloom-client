import React from 'react';

import MainContent from '@containers/Main/Content';
import MainHeader from '@containers/Main/Header';
import MembershipCardContainer from './Card';
import PaymentHistoryContainer from './PaymentHistory';

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
