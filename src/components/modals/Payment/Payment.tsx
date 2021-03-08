import React, { useEffect } from 'react';

import { QueryResult } from '@hooks/useQuery.types';
import Story from '@organisms/Story/Story';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import PaymentStore, { PaymentModel, paymentModel } from './Payment.store';
import { PaymentModalType } from './Payment.types';
import PaymentCardPage from './PaymentCard';
import PaymentConfirmationPage from './PaymentConfirmation';
import PaymentFinishPage from './PaymentFinish';
import PaymentStripeProvider from './PaymentStripeProvider';
import useInitPayment from './useInitPayment';

const PaymentModalContainer: React.FC<Partial<PaymentModel>> = ({
  selectedPlanId
}) => {
  const planId = PaymentStore.useStoreState((store) => store.selectedPlanId);

  const setSelectedTypeId = PaymentStore.useStoreActions(
    (store) => store.setSelectedTypeId
  );

  useEffect(() => {
    if (selectedPlanId !== planId) setSelectedTypeId(selectedPlanId);
  }, [planId, selectedPlanId]);

  return (
    <Story>
      <PaymentCardPage />
      <PaymentFinishPage />
      <PaymentConfirmationPage />
    </Story>
  );
};

const PaymentModal: React.FC = () => {
  const type: PaymentModalType = useStoreState(({ modal }) => {
    return modal.metadata?.type;
  });

  const selectedPlanId: string = useStoreState(({ modal }) => {
    return modal.metadata?.selectedPlanId;
  });

  const currentPlanId: string = useStoreState(({ db }) => {
    return db.member?.plan;
  });

  const isAdmin = useStoreState(({ db }) => !!db.member.role);

  const { loading }: Partial<QueryResult> = useInitPayment();

  // Get the member and see if they've paid their dues or not.
  const isDuesActive = useStoreState(({ db }) => db.member?.isDuesActive);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  useEffect(() => {
    if (!isAdmin && !isDuesActive) {
      showModal({
        id: ModalType.PAY_DUES,
        metadata: { selectedPlanId: currentPlanId, type: 'PAY_DUES' }
      });
    }
  }, [isDuesActive]);

  if (loading || (type !== 'UPDATE_PAYMENT_METHOD' && !selectedPlanId)) {
    return null;
  }

  return (
    <PaymentStore.Provider runtimeModel={{ ...paymentModel, type }}>
      <PaymentStripeProvider>
        <PaymentModalContainer selectedPlanId={selectedPlanId} />
      </PaymentStripeProvider>
    </PaymentStore.Provider>
  );
};

export default PaymentModal;
