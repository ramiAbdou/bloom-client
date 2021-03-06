import {
  OnFormSubmitArgs,
  OnFormSubmitFunction
} from '@organisms/Form/Form.types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const useSavePaymentMethod = (): OnFormSubmitFunction => {
  const elements = useElements();
  const stripe = useStripe();

  const onSubmit = async ({
    goForward,
    items,
    setError,
    setStoryValue
  }: OnFormSubmitArgs) => {
    const city: string = items.CITY.value as string;
    const line1: string = items.BILLING_ADDRESS.value as string;
    const nameOnCard: string = items.NAME_ON_CARD.value as string;
    const postalCode: string = items.ZIP_CODE.value as string;
    const state: string = items.STATE.value as string;

    // Create the payment method via the Stripe SDK.
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      billing_details: {
        address: { city, line1, postal_code: postalCode, state },
        name: nameOnCard
      },
      card: elements.getElement(CardElement),
      type: 'card'
    });

    if (error) {
      setError(error.message);
      return;
    }

    const {
      brand,
      exp_month: expirationMonth,
      exp_year: expirationYear,
      last4
    } = paymentMethod?.card ?? {};

    setStoryValue({
      key: 'CREDIT_OR_DEBIT_CARD',
      value: {
        brand: brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase(),
        expirationDate: `${expirationMonth}/${expirationYear}`,
        last4,
        paymentMethodId: paymentMethod.id
      }
    });

    goForward();
  };

  return onSubmit;
};

export default useSavePaymentMethod;
