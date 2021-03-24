import React from 'react';

import { QueryResult } from '@hooks/useQuery.types';
import Story from '@organisms/Story/Story';
import { useStoreState } from '@store/Store';
import PaymentStore, { paymentModel } from './Payment.store';
import { PaymentModalType } from './Payment.types';
import PaymentCardPage from './PaymentCardPage';
import PaymentConfirmationPage from './PaymentConfirmationPage';
import PaymentFinishPage from './PaymentFinishPage';
import PaymentStripeProvider from './PaymentStripeProvider';
import useInitPayment from './useInitPayment';

const PaymentModalStory: React.FC = () => {
  return (
    <Story>
      <PaymentCardPage />
      <PaymentFinishPage />
      <PaymentConfirmationPage />
    </Story>
  );
};

const PaymentModal: React.FC = () => {
  const modalType: PaymentModalType = useStoreState(({ modal }) => {
    return modal.metadata?.type;
  });

  const selectedPlanId: string = useStoreState(({ modal }) => {
    return modal.metadata?.selectedPlanId;
  });

  const { loading }: Partial<QueryResult> = useInitPayment();

  // If CHANGE_MEMBERSHIP or PAY_DUES, there should be a selectedPlanId!
  const missingSelectedPlan: boolean =
    (modalType === PaymentModalType.CHANGE_MEMBERSHIP ||
      modalType === PaymentModalType.PAY_DUES) &&
    !selectedPlanId;

  if (loading || missingSelectedPlan) return null;

  return (
    <PaymentStore.Provider
      runtimeModel={{ ...paymentModel, selectedPlanId, type: modalType }}
    >
      <PaymentStripeProvider>
        <PaymentModalStory />
      </PaymentStripeProvider>
    </PaymentStore.Provider>
  );
};

export default PaymentModal;
