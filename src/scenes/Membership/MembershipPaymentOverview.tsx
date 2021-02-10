import React from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import useQuery from '@hooks/useQuery';
import { IMemberPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { GET_MEMBER_PAYMENTS, GET_UPCOMING_PAYMENT } from './Membership.gql';
import MembershipPaymentScheduledCard from './MembershipPaymentScheduledCard';
import MembershipPaymentTable from './MembershipPaymentTable';

const MembershipPaymentOverview: React.FC = () => {
  const { loading } = useQuery<IMemberPayment[]>({
    name: 'getMemberPayments',
    query: GET_MEMBER_PAYMENTS,
    schema: [Schema.MEMBER_PAYMENT]
  });

  return (
    <MainSection className="s-membership-overview-ctr">
      <LoadingHeader h2 loading={loading} title="Payment Overview" />
      <MembershipPaymentScheduledCard />
      <MembershipPaymentTable />
    </MainSection>
  );
};

export default MembershipPaymentOverview;
