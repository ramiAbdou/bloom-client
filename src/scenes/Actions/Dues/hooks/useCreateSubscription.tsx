import { OnFormSubmit, OnFormSubmitArgs } from '@components/Form/Form.types';
import useMutation from '@hooks/useMutation';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import {
  CREATE_SUBSCRIPTION,
  CreateSubscriptionArgs,
  CreateSubscriptionResult
} from '../Dues.gql';
import Dues from '../Dues.store';

export default (): OnFormSubmit => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const selectedTypeId = Dues.useStoreState((store) => store.memberTypeId);

  const elements = useElements();
  const stripe = useStripe();

  const [createSubscription] = useMutation<
    CreateSubscriptionResult,
    CreateSubscriptionArgs
  >({
    name: 'createSubscription',
    query: CREATE_SUBSCRIPTION
  });

  return async ({ setErrorMessage, setIsLoading }: OnFormSubmitArgs) => {
    // Start the submit function by clearing the error message and set the
    // form state to loading.
    setErrorMessage(null);
    setIsLoading(true);

    // Create the payment method via the Stripe SDK.
    const stripeResult = await stripe.createPaymentMethod({
      card: elements.getElement(CardElement),
      type: 'card'
    });

    // If the card information is incorrect or doesn't work for some reason,
    // show that error message.
    if (stripeResult.error) {
      setErrorMessage(stripeResult.error.message);
      setIsLoading(false);
      return;
    }

    // Create the actual subscription. Pass the MemberType ID to know what
    // Stripe price ID to look up, as well as the newly created PaymentMethod
    // ID. That will be attached to the customer ID associated with the member.
    const {
      data: subscriptionData,
      error: subscriptionError
    } = await createSubscription({
      memberTypeId: selectedTypeId,
      paymentMethodId: stripeResult.paymentMethod.id
    });

    if (subscriptionError) {
      setErrorMessage(subscriptionError);
      setIsLoading(false);
      return;
    }

    // Success! Update the member entity just in case the membership type
    // changed or their duesStatus changed.
    mergeEntities({ data: subscriptionData, schema: Schema.MEMBER });

    // Needs to change, to show confirmation screen.
    closeModal();
  };
};
