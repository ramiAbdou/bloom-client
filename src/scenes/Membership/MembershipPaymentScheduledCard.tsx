import day from 'dayjs';
import React from 'react';

import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import useQuery from '@hooks/useQuery';
import { useStoreState } from '@store/Store';
import { GetUpcomingPaymentResult } from './Membership.types';

const MembershipPaymentScheduledCard: React.FC = () => {
  const autoRenew = useStoreState(({ db }) => db.member.autoRenew);

  const { data, loading } = useQuery<GetUpcomingPaymentResult>({
    fields: ['amount', 'nextPaymentDate'],
    operation: 'getUpcomingPayment'
  });

  const amount = `$${data?.amount?.toFixed(2)}`;
  const date = day(data?.nextPaymentDate).format('MMMM D, YYYY');

  return (
    <Card
      className="s-membership-card s-membership-card--next"
      loading={loading}
      show={!loading && !!data?.amount}
    >
      <h4>{autoRenew ? 'Next Scheduled Payment' : 'Next Payment Due'}</h4>

      <Row justify="sb" spacing="xs">
        <p>{date}</p>
        <p>{amount}</p>
      </Row>
    </Card>
  );
};

export default MembershipPaymentScheduledCard;
