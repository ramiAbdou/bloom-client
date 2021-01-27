import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { Schema } from '@store/Db/schema';
import {
  CREATE_SUBSCRIPTION,
  CreateSubscriptionArgs,
  CreateSubscriptionResult
} from './Payment.gql';
import PaymentStore from './Payment.store';

const useCreateSubscription = (): OnFormSubmit => {
  const prorationDate = PaymentStore.useStoreState(
    (store) => store.changeProrationDate
  );

  const memberTypeId = PaymentStore.useStoreState(
    (store) => store.selectedTypeId
  );

  const pushToMembership = usePush('membership');

  const [createSubscription] = useMutation<
    CreateSubscriptionResult,
    CreateSubscriptionArgs
  >({
    name: 'createSubscription',
    query: CREATE_SUBSCRIPTION,
    schema: Schema.MEMBER
  });

  const onSubmit = async ({
    goToNextPage,
    items,
    setErrorMessage
  }: OnFormSubmitArgs) => {
    const autoRenew = items.find(({ type }) => type === 'TOGGLE')?.value;

    // Create the actual subscription. Pass the MemberType ID to know what
    // Stripe price ID to look up, as well as the newly created IPaymentMethod
    // ID. That will be attached to the customer ID associated with the member.
    const { error } = await createSubscription({
      autoRenew,
      memberTypeId,
      prorationDate
    });

    if (error) {
      setErrorMessage(error);
      return;
    }

    goToNextPage();
    pushToMembership();
  };

  return onSubmit;
};

export default useCreateSubscription;
