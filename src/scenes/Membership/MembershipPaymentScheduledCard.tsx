import day from 'dayjs';
import React from 'react';

import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import useQuery from '@hooks/useQuery';
import { useStoreState } from '@store/Store';
import {
  GET_UPCOMING_PAYMENT,
  GetUpcomingPaymentResult
} from './Membership.gql';

const MembershipPaymentScheduledCard: React.FC = () => {
  const autoRenew = useStoreState(({ db }) => db.member.autoRenew);

  const { data, loading } = useQuery<GetUpcomingPaymentResult>({
    name: 'getUpcomingPayment',
    query: GET_UPCOMING_PAYMENT
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

      <Row spaceBetween>
        <p>{date}</p>
        <p>{amount}</p>
      </Row>
    </Card>
  );
};

export default MembershipPaymentScheduledCard;
