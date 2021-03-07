import useQuery from '@hooks/useQuery';
import { QueryResult } from '@hooks/useQuery.types';
import { IIntegrations, IMemberIntegrations } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { QueryEvent } from '@util/events';

const useInitPayment = (): Partial<QueryResult> => {
  const { loading: loading1 } = useQuery<IIntegrations>({
    fields: ['id', 'stripeAccountId', { community: ['id'] }],
    operation: QueryEvent.GET_INTEGRATIONS,
    schema: Schema.INTEGRATIONS
  });

  const { loading: loading2 } = useQuery<IMemberIntegrations>({
    fields: [
      'id',
      'stripeSubscriptionId',
      { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] },
      { member: ['id'] }
    ],
    operation: QueryEvent.GET_MEMBER_INTEGRATIONS,
    schema: [Schema.MEMBER_INTEGRATIONS]
  });

  return { loading: loading1 || loading2 };
};

export default useInitPayment;
