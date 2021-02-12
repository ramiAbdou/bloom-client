import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IMemberPayment } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import PaymentStore from './Payment.store';
import { CreateSubscriptionArgs } from './Payment.types';

const useCreateSubscription = (): OnFormSubmit => {
  const prorationDate = PaymentStore.useStoreState(
    (store) => store.changeProrationDate
  );

  const memberTypeId = PaymentStore.useStoreState(
    (store) => store.selectedTypeId
  );

  const pushToMembership = usePush('membership');

  const [createSubscription] = useMutation<
    IMemberPayment,
    CreateSubscriptionArgs
  >({
    fields: [
      'amount',
      'createdAt',
      'id',
      { member: ['id', 'autoRenew', 'isDuesActive', { type: ['id', 'name'] }] }
    ],
    operation: 'createSubscription',
    schema: Schema.MEMBER_PAYMENT,
    types: {
      autoRenew: { required: false, type: 'Boolean' },
      memberTypeId: { required: true }
    }
  });

  const onSubmit = async ({ goForward, items, setError }: OnFormSubmitArgs) => {
    const autoRenew = items.AUTO_RENEW?.value;

    // Create the actual subscription. Pass the MemberType ID to know what
    // Stripe price ID to look up, as well as the newly created IPaymentMethod
    // ID. That will be attached to the customer ID associated with the member.
    const { error } = await createSubscription({
      autoRenew,
      memberTypeId,
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
