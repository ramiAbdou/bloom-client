import React from 'react';

import MainHeader from '@components/Main/Header';
import MembershipCardContainer from './containers/Card';
import PaymentHistoryContainer from './containers/PaymentHistory';

const ManageMembership = () => {
  return (
    <>
      <MainHeader title="Manage Membership" />

      <div className="s-home-content">
        <MembershipCardContainer />
        <PaymentHistoryContainer />
      </div>
    </>
  );
};

export default ManageMembership;
