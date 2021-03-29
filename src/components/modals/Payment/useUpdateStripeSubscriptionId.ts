import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { IMemberIntegrations } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { MutationEvent } from '@util/constants.events';
import PaymentStore from './Payment.store';
import { CreateSubscriptionArgs } from './Payment.types';

const useUpdateStripeSubscriptionId = (): OnFormSubmitFunction => {
  const memberPlanId: string = PaymentStore.useStoreState(
    (state) => state.selectedPlanId
  );

  const prorationDate: number = PaymentStore.useStoreState(
    (state) => state.changeProrationDate
  );

  const pushToMembership: VoidFunction = usePush('membership');

  const [updateStripeSubscriptionId] = useMutation<
    IMemberIntegrations,
    CreateSubscriptionArgs
  >({
    fields: [
      'id',
      'stripeSubscriptionId',
      { member: ['id', 'isDuesActive', { plan: ['id'] }] }
    ],
    operation: MutationEvent.UPDATE_STRIPE_SUBSCRIPTION_ID,
    schema: Schema.MEMBER_INTEGRATIONS,
    types: {
      memberPlanId: { required: true },
      prorationDate: { required: false, type: 'Int' }
    }
  });

  const onSubmit: OnFormSubmitFunction = async (args: OnFormSubmitArgs) => {
    const { error } = await updateStripeSubscriptionId({
      memberPlanId,
      prorationDate
    });

    if (error) {
      args.setError(error);
      return;
    }

    args.goForward();

    // Redirect to the /membership page after a timeout of 2.5 seconds. The
    // reason we want this timeout is so that we can give our backend a little
    // bit of time to capture the Stripe webhook and create the payment so
    // we can display it in the MembershipPaymentTable.
    setTimeout(() => {
      pushToMembership();
    }, 2500);
  };

  return onSubmit;
};

export default useUpdateStripeSubscriptionId;
