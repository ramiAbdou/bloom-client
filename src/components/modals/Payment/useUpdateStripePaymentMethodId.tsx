import useMutation from '@hooks/useMutation';
import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { IMemberIntegrations } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { MutationEvent } from '@util/events';
import { UpdateStripePaymentMethodIdArgs } from './Payment.types';

const useUpdateStripePaymentMethodId = (): OnFormSubmit => {
  const elements = useElements();
  const stripe = useStripe();

  const [updateStripePaymentMethodId] = useMutation<
    Pick<IMemberIntegrations, 'id' | 'paymentMethod'>,
    UpdateStripePaymentMethodIdArgs
  >({
    fields: [
      'id',
      { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] }
    ],
    operation: MutationEvent.UPDATE_STRIPE_PAYMENT_METHOD_ID,
    schema: Schema.MEMBER_INTEGRATIONS,
    types: { paymentMethodId: { required: true } }
  });

  if (!stripe) return null;

  const onSubmit = async ({ goForward, items, setError }: OnFormSubmitArgs) => {
    const city = items.CITY.value;
    const line1 = items.BILLING_ADDRESS.value;
    const nameOnCard = items.NAME_ON_CARD.value;
    const postalCode = items.ZIP_CODE.value;
    const state = items.STATE.value;

    // Create the payment method via the Stripe SDK.
    const stripeResult = await stripe.createPaymentMethod({
      billing_details: {
        address: { city, line1, postal_code: postalCode, state },
        name: nameOnCard
      },
      card: elements.getElement(CardElement),
      type: 'card'
    });

    // If the card information is incorrect or doesn't work for some reason,
    // show that error message.
    if (stripeResult.error) {
      setError(stripeResult.error.message);
      return;
    }

    // Create the actual subscription. Pass the MemberPlan ID to know what
    // Stripe price ID to look up, as well as the newly created IPaymentMethod
    // ID. That will be attached to the customer ID associated with the member.
    const { error: updateError } = await updateStripePaymentMethodId({
      paymentMethodId: stripeResult.paymentMethod.id
    });

    if (updateError) {
      setError(updateError);
      return;
    }

    // Success! Update the member entity just in case the membership type
    // changed or their status changed.
    goForward();
  };

  return onSubmit;
};

export default useUpdateStripePaymentMethodId;