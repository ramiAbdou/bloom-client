import React, { useEffect } from 'react';

import { QueryResult } from '@hooks/useQuery.types';
import Story from '@organisms/Story/Story';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
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

  const currentPlanId: string = useStoreState(({ db }) => {
    return db.member?.plan;
  });

  const isAdmin: boolean = useStoreState(({ db }) => !!db.member.role);
  const isDuesActive = useStoreState(({ db }) => db.member?.isDuesActive);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { loading }: Partial<QueryResult> = useInitPayment();

  // Get the member and see if they've paid their dues or not.

  useEffect(() => {
    if (isAdmin || isDuesActive) return;

    showModal({
      id: ModalType.PAY_DUES,
      metadata: { selectedPlanId: currentPlanId, type: 'PAY_DUES' }
    });
  }, [isDuesActive]);

  if (loading) return null;
  if (modalType !== 'UPDATE_PAYMENT_METHOD' && !selectedPlanId) return null;

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
