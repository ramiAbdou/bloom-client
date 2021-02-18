import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import useQuery from '@hooks/useQuery';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { GetUpcomingPaymentResult } from './Membership.types';

const useInitScheduledPayment = (): GetUpcomingPaymentResult => {
  const stripeSubscriptionId = useStoreState(
    ({ db }) => db.member.stripeSubscriptionId
  );

  useQuery({
    fields: ['id', 'stripeSubscriptionId'],
    operation: 'getMember',
    schema: Schema.MEMBER
  });

  const [
    getUpcomingPayment,
    { data }
  ] = useManualQuery<GetUpcomingPaymentResult>({
    fields: ['amount', 'nextPaymentDate'],
    operation: 'getUpcomingPayment'
  });

  useEffect(() => {
    if (stripeSubscriptionId) getUpcomingPayment();
  }, [stripeSubscriptionId]);

  return data;
};

export default useInitScheduledPayment;
