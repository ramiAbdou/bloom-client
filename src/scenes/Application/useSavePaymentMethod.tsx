import { OnFormSubmit, OnFormSubmitArgs } from '@organisms/Form/Form.types';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const useSavePaymentMethod = (): OnFormSubmit => {
  const elements = useElements();
  const stripe = useStripe();

  if (!stripe) return null;

  const onSubmit = async ({
    goForward,
    items,
    setError,
    setStoryItems
  }: OnFormSubmitArgs) => {
    const city = items.CITY.value;
    const line1 = items.BILLING_ADDRESS.value;
    const nameOnCard = items.NAME_ON_CARD.value;
    const postalCode = items.ZIP_CODE.value;
    const state = items.STATE.value;

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

    setStoryItems({
      ...items,
      CREDIT_OR_DEBIT_CARD: {
        brand: brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase(),
        expirationDate: `${expirationMonth}/${expirationYear}`,
        last4
      }
    });

    goForward();
  };

  return onSubmit;
};

export default useSavePaymentMethod;
