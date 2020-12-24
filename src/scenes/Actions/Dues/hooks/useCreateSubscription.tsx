import { OnFormSubmit, OnFormSubmitArgs } from '@components/Form/Form.types';
import useMutation from '@hooks/useMutation';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { PaymentMethodCreateParams } from '@stripe/stripe-js';
import {
  CREATE_SUBSCRIPTION,
  CreateSubscriptionArgs,
  CreateSubscriptionResult
} from '../Dues.gql';
import Dues from '../Dues.store';

export default function useCreateSubscription(): OnFormSubmit {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const selectedTypeId = Dues.useStoreState((store) => store.selectedTypeId);

  const elements = useElements();
  const stripe = useStripe();

  const [createSubscription] = useMutation<
    CreateSubscriptionResult,
    CreateSubscriptionArgs
  >({
    name: 'createSubscription',
    query: CREATE_SUBSCRIPTION
  });

  if (!stripe) return null;

  return async ({ items, setErrorMessage, setIsLoading }: OnFormSubmitArgs) => {
    const nameOnCard = items.find(({ title }) => title === 'Name on Card')
      .value;

    if (!nameOnCard) {
      setErrorMessage('Please fill out ');
      setIsLoading(false);
      return;
    }

    // Start the submit function by clearing the error message and set the
    // form state to loading.
    setErrorMessage(null);
    setIsLoading(true);

    const params: Partial<PaymentMethodCreateParams> = nameOnCard
      ? { billing_details: { name: nameOnCard } }
      : {};

    // Create the payment method via the Stripe SDK.
    const stripeResult = await stripe.createPaymentMethod({
      ...params,
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
}
