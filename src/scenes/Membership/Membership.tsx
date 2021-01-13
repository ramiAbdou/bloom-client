import React from 'react';

import PaymentModal from '@modals/Payment/Payment';
import MembershipStore from './Membership.store';
import MembershipContent from './MembershipContent';

const MembershipModals: React.FC = () => {
  const typeId = MembershipStore.useStoreState((store) => store.selectedTypeId);

  return (
    <>
      <PaymentModal selectedTypeId={typeId} type="CHANGE_MEMBERSHIP" />
      <PaymentModal type="UPDATE_PAYMENT_METHOD" />
    </>
  );
};

const Membership: React.FC = () => (
  <MembershipStore.Provider>
    <MembershipContent />
    <MembershipModals />
  </MembershipStore.Provider>
);

export default Membership;
