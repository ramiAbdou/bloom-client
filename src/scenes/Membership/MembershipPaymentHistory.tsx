import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import MembershipPaymentTable from './MembershipPaymentTable';
import useInitPayments from './useInitPayments';

const MembershipPaymentHistory: React.FC = () => {
  const { loading } = useInitPayments();

  return (
    <MainSection className="s-membership-overview-ctr">
      <LoadingHeader h2 loading={loading} title="Payment Overview" />
      <MembershipPaymentTable />
    </MainSection>
  );
};

export default MembershipPaymentHistory;
