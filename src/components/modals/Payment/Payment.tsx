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

const PaymentModalStory: React.FC = () => (
  <Story>
    <PaymentCardPage />
    <PaymentFinishPage />
    <PaymentConfirmationPage />
  </Story>
);

const PaymentModal: React.FC = () => {
  const modalType: PaymentModalType = useStoreState(
    ({ modal }) => modal.metadata?.type
  );

  const selectedMemberTypeId: string = useStoreState(
    ({ modal }) => modal.metadata?.selectedMemberTypeId
  );

  const { loading }: Partial<QueryResult> = useInitPayment();

  // If CHANGE_MEMBERSHIP or PAY_DUES, there should be a selectedMemberTypeId!
  const missingSelectedMemberType: boolean =
    (modalType === PaymentModalType.CHANGE_MEMBERSHIP ||
      modalType === PaymentModalType.PAY_DUES) &&
    !selectedMemberTypeId;

  if (loading || missingSelectedMemberType) return null;

  return (
    <PaymentStore.Provider
      runtimeModel={{ ...paymentModel, selectedMemberTypeId, type: modalType }}
    >
      <PaymentStripeProvider>
        <PaymentModalStory />
      </PaymentStripeProvider>
    </PaymentStore.Provider>
  );
};

export default PaymentModal;
