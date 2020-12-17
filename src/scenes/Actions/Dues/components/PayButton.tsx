import React, { useEffect, useState } from 'react';

import PrimaryButton from '@components/Button/PrimaryButton';
import { LoadingProps } from '@constants';
import {
  PaymentRequestButtonElement,
  useStripe
} from '@stripe/react-stripe-js';

export default (props: LoadingProps) => {
  const [paymentRequest, setPaymentRequest] = useState(null);

  const stripe = useStripe();

  useEffect(() => {
    (async () => {
      if (stripe) {
        const pr = stripe.paymentRequest({
          country: 'US',
          currency: 'usd',
          requestPayerEmail: true,
          requestPayerName: true,
          total: { amount: 1099, label: 'Demo total' }
        });

        // Check the availability of the Payment Request API.
        const result = await pr.canMakePayment();
        if (result) setPaymentRequest(pr);
      }
    })();
  }, [stripe]);

  if (paymentRequest) {
    return <PaymentRequestButtonElement options={{ paymentRequest }} />;
  }

  // Use a traditional checkout form.
  return (
    <PrimaryButton
      {...props}
      large
      disabled={!stripe}
      loadingText="Paying..."
      title="Pay $25"
    />
  );
};
