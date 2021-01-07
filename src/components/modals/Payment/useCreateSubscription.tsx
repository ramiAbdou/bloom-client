import useMutation from '@hooks/useMutation';
import usePush from '@hooks/usePush';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import {
  CREATE_SUBSCRIPTION,
  CreateSubscriptionArgs,
  CreateSubscriptionResult
} from './Payment.gql';
import PaymentStore from './Payment.store';

const useCreateSubscription = (): OnFormSubmit => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const setScreen = PaymentStore.useStoreActions((store) => store.setScreen);

  const selectedTypeId = PaymentStore.useStoreState(
    (store) => store.selectedTypeId
  );

  const pushToMembership = usePush('membership');

  const [createSubscription] = useMutation<
    CreateSubscriptionResult,
    CreateSubscriptionArgs
  >({
    name: 'createSubscription',
    query: CREATE_SUBSCRIPTION
  });

  const onSubmit = async ({
    setErrorMessage,
    setIsLoading
  }: OnFormSubmitArgs) => {
    // Start the submit function by clearing the error message and set the
    // form state to loading.
    setErrorMessage(null);
    setIsLoading(true);

    // Create the actual subscription. Pass the MemberType ID to know what
    // Stripe price ID to look up, as well as the newly created IPaymentMethod
    // ID. That will be attached to the customer ID associated with the member.
    const {
      data: subscriptionData,
      error: subscriptionError
    } = await createSubscription({ memberTypeId: selectedTypeId });

    if (subscriptionError) {
      setErrorMessage(subscriptionError);
      setIsLoading(false);
      return;
    }

    // Success! Update the member entity just in case the membership type
    // changed or their duesStatus changed.
    mergeEntities({ data: subscriptionData, schema: Schema.MEMBER });
    setScreen('CONFIRMATION');
    pushToMembership();
  };

  return onSubmit;
};

export default useCreateSubscription;
