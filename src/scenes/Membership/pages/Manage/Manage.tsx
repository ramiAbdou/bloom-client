import React from 'react';

import MembershipHeader from './components/Header';
import MembershipCardContainer from './containers/Card';
import PaymentHistoryContainer from './containers/PaymentHistory';
import UpdatePaymentModal from './modals/UpdatePayment/UpdatePayment';

const ManageMembership = () => {
  return (
    <>
      <MembershipHeader />

      <div className="s-home-content">
        <MembershipCardContainer />
        <PaymentHistoryContainer />
      </div>

      <UpdatePaymentModal />
    </>
  );
};

export default ManageMembership;
