import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import Section from '@containers/Section';
import MembershipPaymentTable from './MembershipPaymentTable';
import useInitMembershipPaymentHistory from './useInitMembershipPaymentHistory';

const MembershipPaymentHistory: React.FC = () => {
  const { loading } = useInitMembershipPaymentHistory();

  return (
    <Section className="s-membership-overview-ctr">
      <LoadingHeader
        h2
        className="mb-sm"
        loading={loading}
        title="Payment Overview"
      />
      <MembershipPaymentTable />
    </Section>
  );
};

export default MembershipPaymentHistory;
