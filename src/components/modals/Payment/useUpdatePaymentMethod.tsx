import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IMember } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions } from '@store/Store';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { UPDATE_PAYMENT_METHOD, UpdatePaymentMethodArgs } from './Payment.gql';
import PaymentStore from './Payment.store';

const useUpdatePaymentMethod = (): OnFormSubmit => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const type = PaymentStore.useStoreState((store) => store.type);
  const setScreen = PaymentStore.useStoreActions((store) => store.setScreen);

  const elements = useElements();
  const stripe = useStripe();

  const [updatePaymentMethod] = useMutation<
    Pick<IMember, 'id' | 'paymentMethod'>,
    UpdatePaymentMethodArgs
  >({
    name: 'updatePaymentMethod',
    query: UPDATE_PAYMENT_METHOD
  });

  if (!stripe) return null;

  const onSubmit = async ({
    items,
    setErrorMessage,
    setIsLoading
  }: OnFormSubmitArgs) => {
    const city = items.find(({ title }) => title === 'City').value;
    const state = items.find(({ title }) => title === 'State').value;
    const postalCode = items.find(({ title }) => title === 'Zip Code').value;

    const nameOnCard = items.find(({ title }) => title === 'Name on Card')
      .value;

    // Start the submit function by clearing the error message and set the
    // form state to loading.
    setErrorMessage(null);
    setIsLoading(true);

    // Create the payment method via the Stripe SDK.
    const stripeResult = await stripe.createPaymentMethod({
      billing_details: {
        address: { city, postal_code: postalCode, state },
        name: nameOnCard
      },
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
    // Stripe price ID to look up, as well as the newly created IPaymentMethod
    // ID. That will be attached to the customer ID associated with the member.
    const { data: updateData, error: updateError } = await updatePaymentMethod({
      paymentMethodId: stripeResult.paymentMethod.id
    });

    if (updateError) {
      setErrorMessage(updateError);
      setIsLoading(false);
      return;
    }

    // Success! Update the member entity just in case the membership type
    // changed or their duesStatus changed.
    mergeEntities({ data: updateData, schema: Schema.MEMBER });
    setScreen(type === 'UPDATE_PAYMENT_METHOD' ? 'CONFIRMATION' : 'FINISH');
  };

  return onSubmit;
};

export default useUpdatePaymentMethod;
