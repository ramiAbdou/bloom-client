import { useMutation } from 'graphql-hooks';

import { OnFormSubmit, OnFormSubmitArgs } from '@components/Form/Form.types';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { getGraphQLError } from '@util/util';
import { CONFIRM_PAYMENT_INTENT, CREATE_PAYMENT_INTENT } from '../Dues.gql';
import Dues from '../Dues.store';

export default (): OnFormSubmit => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const selectedTypeId = Dues.useStoreState((store) => store.memberTypeId);

  const elements = useElements();
  const stripe = useStripe();

  const [createPaymentIntent] = useMutation(CREATE_PAYMENT_INTENT);
  const [confirmPaymentIntent] = useMutation(CONFIRM_PAYMENT_INTENT);

  return async ({ setErrorMessage, setIsLoading }: OnFormSubmitArgs) => {
    // Start the submit function by clearing the error message and set the
    // form state to loading.
    setErrorMessage(null);
    setIsLoading(true);

    // Call #1: Fetch the payment intent object from the server.
    const paymentIntentResult = await createPaymentIntent({
      variables: { memberTypeId: selectedTypeId }
    });

    if (paymentIntentResult.error) {
      setErrorMessage(getGraphQLError(paymentIntentResult.error));
      setIsLoading(false);
    }

    // Call #2: Send the card information to Stripe via the React SDK.
    const clientSecret: string = paymentIntentResult.data.createPaymentIntent;

    const stripeConfirmationResult = await stripe.confirmCardPayment(
      clientSecret,
      { payment_method: { card: elements.getElement(CardElement) } }
    );

    if (stripeConfirmationResult.error) {
      setErrorMessage(stripeConfirmationResult.error.message);
      setIsLoading(false);
      return;
    }

    // Call #3: Confirm the PaymentIntent and update the MemberPayment to
    // FULFILLED when the card information is verified.
    const { data: confirmData } = await confirmPaymentIntent({
      variables: { paymentIntentId: stripeConfirmationResult.paymentIntent.id }
    });

    mergeEntities({
      data: confirmData?.confirmPaymentIntent,
      schema: Schema.MEMBER
    });

    closeModal();
  };
};
