import useBloomMutation from '@gql/useBloomMutation';
import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { IMemberIntegrations } from '@db/Db.entities';
import { Schema } from '@db/Db.schema';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { MutationEvent } from '@util/constants.events';
import { UpdateStripePaymentMethodIdArgs } from './Payment.types';

const useUpdateStripePaymentMethodId = (): OnFormSubmitFunction => {
  const elements = useElements();
  const stripe = useStripe();

  const [updateStripePaymentMethodId] = useBloomMutation<
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
    const city: string = items.CITY.value as string;
    const line1: string = items.BILLING_ADDRESS.value as string;
    const nameOnCard: string = items.NAME_ON_CARD.value as string;
    const postalCode: string = items.ZIP_CODE.value as string;
    const state: string = items.STATE.value as string;

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

    // Create the actual subscription. Pass the MemberType ID to know what
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
