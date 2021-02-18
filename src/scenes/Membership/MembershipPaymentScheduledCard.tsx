import day from 'dayjs';
import React from 'react';

import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import { useStoreState } from '@store/Store';
import { GetUpcomingPaymentResult } from './Membership.types';
import useInitScheduledPayment from './useInitScheduledPayment';

const MembershipPaymentScheduledCard: React.FC = () => {
  const autoRenew = useStoreState(({ db }) => db.member.autoRenew);

  const data: GetUpcomingPaymentResult = useInitScheduledPayment();

  const amount = `$${data?.amount?.toFixed(2)}`;
  const date = day(data?.nextPaymentDate).format('MMMM D, YYYY');

  return (
    <Card
      className="s-membership-card s-membership-card--next"
      show={!!data?.amount}
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
