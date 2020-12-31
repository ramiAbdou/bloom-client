import React from 'react';

import UpdatePaymentModal from '../../modals/UpdatePayment/UpdatePayment';
import MembershipHeader from './components/Header';
import MembershipCardContainer from './containers/Card';
import PaymentHistoryContainer from './containers/PaymentHistory';

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
