import React from 'react';

import { StoryPageProps } from '@organisms/Story/Story.types';
import StoryPage from '@organisms/Story/StoryPage';
import PaymentStore from './Payment.store';
import { PaymentModalType } from './Payment.types';

const PaymentConfirmation: React.FC = () => {
  const modalType = PaymentStore.useStoreState((state) => {
    return state.type;
  });

  let pageProps: Pick<StoryPageProps, 'description' | 'title'>;

  if (modalType === PaymentModalType.UPDATE_PAYMENT_METHOD) {
    pageProps = {
      description:
        'Your card on file has been updated, and you may now use this card to pay dues. We sent you a confirmation email!',
      title: 'Payment Method Updated'
    };
  } else if (modalType === PaymentModalType.CHANGE_MEMBERSHIP) {
    pageProps = {
      description:
        'Your membership has successfully been changed. Please check your email for a confirmation.',
      title: 'Membership Plan Changed'
    };
  } else if (modalType === PaymentModalType.PAY_DUES) {
    pageProps = {
      description:
        'Your dues have been paid successfully! Please check your email for a receipt.',
      title: 'Dues Payment Successful'
    };
  }

  return <StoryPage confirmation confirmationClose {...pageProps} />;
};

export default PaymentConfirmation;
