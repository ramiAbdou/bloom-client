import { useEffect } from 'react';

import useManualQuery from '@hooks/useManualQuery';
import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { GetUpcomingPaymentResult } from './Membership.types';

const useInitScheduledPayment = (): QueryResult<GetUpcomingPaymentResult> => {
  const stripeSubscriptionId = useStoreState(
    ({ db }) => db.member.stripeSubscriptionId
  );

  const { loading: loading1 } = useQuery<IMember>({
    fields: ['id', 'stripeSubscriptionId'],
    operation: 'getMember',
    schema: Schema.MEMBER
  });

  const [
    getUpcomingPayment,
    { data, loading: loading2 }
  ] = useManualQuery<GetUpcomingPaymentResult>({
    fields: ['amount', 'nextPaymentDate'],
    operation: 'getUpcomingPayment'
  });

  useEffect(() => {
    if (stripeSubscriptionId) getUpcomingPayment();
  }, [stripeSubscriptionId]);

  return { data, error: null, loading: loading1 || loading2 };
};

export default useInitScheduledPayment;
