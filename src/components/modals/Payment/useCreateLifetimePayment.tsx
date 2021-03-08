import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/events';
import PaymentStore from './Payment.store';
import { CreateLifetimePaymentArgs } from './Payment.types';

const useCreateLifetimePayment = () => {
  const planId = PaymentStore.useStoreState((state) => state.selectedPlanId);
  const pushToMembership = usePush('membership');

  const [createLifetimePayment] = useMutation<any, CreateLifetimePaymentArgs>({
    fields: [
      'amount',
      'createdAt',
      'id',
      {
        member: [
          'id',
          'isDuesActive',
          { memberIntegrations: ['id', 'stripeSubscriptionId'] },
          { plan: ['id'] }
        ]
      }
    ],
    operation: MutationEvent.CREATE_LIFETIME_PAYMENT,
    schema: Schema.PAYMENT,
    types: { memberPlanId: { required: true } }
  });

  const onSubmit = async ({ goForward, setError }: OnFormSubmitArgs) => {
    const { error } = await createLifetimePayment({ memberPlanId: planId });

    if (error) {
      setError(error);
      return;
    }

    goForward();
    pushToMembership();
  };

  return planId ? onSubmit : null;
};

export default useCreateLifetimePayment;
