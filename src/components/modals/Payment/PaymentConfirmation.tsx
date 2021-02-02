import deline from 'deline';
import React from 'react';

import { StoryPageProps } from '@organisms/Story/Story.types';
import StoryPage from '@organisms/Story/StoryPage';
import PaymentStore from './Payment.store';

const PaymentConfirmation: React.FC = () => {
  const modalType = PaymentStore.useStoreState((store) => store.type);

  let pageProps: Pick<StoryPageProps, 'description' | 'title'>;

  if (modalType === 'UPDATE_PAYMENT_METHOD') {
    pageProps = {
      description: deline`
          Your card on file has been updated, and you may now use this card to pay
          dues. We sent you a confirmation email!
        `,
      title: 'Payment Method Updated'
    };
  } else if (modalType === 'CHANGE_MEMBERSHIP') {
    pageProps = {
      description: deline`
        Your membership has successfully been changed. Please check your email
        for a confirmation.
      `,
      title: 'Membership Plan Changed'
    };
  } else if (modalType === 'PAY_DUES') {
    pageProps = {
      description: deline`
        Your dues have been paid successfully! Please check your email
        for a receipt.
      `,
      title: 'Dues Payment Successful'
    };
  }

  return <StoryPage confirmation confirmationClose {...pageProps} />;
};

export default PaymentConfirmation;