import day from 'dayjs';
import React from 'react';

import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import { GetUpcomingPaymentResult } from './Membership.types';
import useInitScheduledPayment from './useInitScheduledPayment';

const MembershipPaymentScheduledCard: React.FC = () => {
  const data: GetUpcomingPaymentResult = useInitScheduledPayment();

  const amount = `$${data?.amount?.toFixed(2)}`;
  const date = day(data?.nextPaymentDate).format('MMMM D, YYYY');

  return (
    <Card
      className="s-membership-card s-membership-card--next"
      show={!!data?.amount}
    >
      <h4>Next Scheduled Payment</h4>

      <Row justify="sb" spacing="xs">
        <p>{date}</p>
        <p>{amount}</p>
      </Row>
    </Card>
  );
};

export default MembershipPaymentScheduledCard;
