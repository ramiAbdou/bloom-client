import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import MembershipPaymentTable from './MembershipPaymentTable';
import useInitMemberPayments from './useInitMemberPayments';

const MembershipPaymentHistory: React.FC = () => {
  const { loading } = useInitMemberPayments();

  return (
    <MainSection className="s-membership-overview-ctr">
      <LoadingHeader h2 loading={loading} title="Payment Overview" />
      <MembershipPaymentTable />
    </MainSection>
  );
};

export default MembershipPaymentHistory;
