import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/events';
import PaymentStore from './Payment.store';
import { CreateSubscriptionArgs } from './Payment.types';

const useCreateSubscription = (): OnFormSubmit => {
  const prorationDate = PaymentStore.useStoreState(
    (store) => store.changeProrationDate
  );

  const planId = PaymentStore.useStoreState((store) => store.selectedPlanId);

  const pushToMembership = usePush('membership');

  const [createSubscription] = useMutation<IPayment, CreateSubscriptionArgs>({
    fields: [
      'amount',
      'createdAt',
      'id',
      {
        member: [
          'id',
          'isDuesActive',
          { memberIntegrations: ['id', 'stripeSubscriptionId'] }
        ]
      },
      { plan: ['id'] }
    ],
    operation: MutationEvent.CREATE_SUBSCRIPTION,
    schema: Schema.PAYMENT,
    types: { memberPlanId: { required: true } }
  });

  const onSubmit = async ({ goForward, setError }: OnFormSubmitArgs) => {
    // Create the actual subscription. Pass the MemberPlan ID to know what
    // Stripe price ID to look up, as well as the newly created IPaymentMethod
    // ID. That will be attached to the customer ID associated with the member.
    const { error } = await createSubscription({
      memberPlanId: planId,
      prorationDate
    });

    if (error) {
      setError(error);
      return;
    }

    goForward();
    pushToMembership();
  };

  return onSubmit;
};

export default useCreateSubscription;
