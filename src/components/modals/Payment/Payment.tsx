import React, { useEffect } from 'react';

import { ModalType } from '@constants';
import useQuery from '@hooks/useQuery';
import ModalStore from '@organisms/Modal/Modal.store';
import Story from '@organisms/Story/Story';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import { GET_PAYMENT_INTEGRATIONS } from './Payment.gql';
import PaymentStore, { PaymentModel, paymentModel } from './Payment.store';
import { PaymentModalType } from './Payment.types';
import PaymentCardPage from './PaymentCard';
import PaymentConfirmationPage from './PaymentConfirmation';
import PaymentFinishPage from './PaymentFinish';
import PaymentStripeProvider from './PaymentStripeProvider';

const PaymentModalContainer: React.FC<Partial<PaymentModel>> = ({
  selectedTypeId
}) => {
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);
  // const type = PaymentStore.useStoreState((store) => store.type);
  // const clearOptions = PaymentStore.useStoreActions((store) => store.clear);

  const setSelectedTypeId = PaymentStore.useStoreActions(
    (store) => store.setSelectedTypeId
  );

  useEffect(() => {
    if (selectedTypeId !== typeId) setSelectedTypeId(selectedTypeId);
  }, [typeId, selectedTypeId]);

  // const onClose = () => clearOptions();

  return (
    <Story>
      <PaymentCardPage />
      <PaymentFinishPage />
      <PaymentConfirmationPage />
    </Story>
  );
};

const PaymentModal: React.FC = () => {
  const type = ModalStore.useStoreState(
    (store) => store.metadata?.type
  ) as PaymentModalType;

  const selectedTypeId = ModalStore.useStoreState(
    (store) => store.metadata?.selectedTypeId
  ) as string;

  const currentTypeId: string = useStoreState(({ db }) => {
    return db.member?.type;
  });

  const isAdmin = useStoreState(({ db }) => !!db.member.role);

  const { loading } = useQuery<ICommunity>({
    name: 'getIntegrations',
    query: GET_PAYMENT_INTEGRATIONS,
    schema: Schema.COMMUNITY_INTEGRATIONS
  });

  // Get the user and see if they've paid their dues or not.
  const isDuesActive = useStoreState(({ db }) => db.member?.isDuesActive);
  const showModal = ModalStore.useStoreActions((store) => store.showModal);

  useEffect(() => {
    if (!isAdmin && !isDuesActive) {
      showModal({
        id: ModalType.PAY_DUES,
        metadata: { selectedTypeId: currentTypeId, type: 'PAY_DUES' }
      });
    }
  }, [isDuesActive]);

  if (loading || (type !== 'UPDATE_PAYMENT_METHOD' && !selectedTypeId)) {
    return null;
  }

  return (
    <PaymentStore.Provider runtimeModel={{ ...paymentModel, type }}>
      <PaymentStripeProvider>
        <PaymentModalContainer selectedTypeId={selectedTypeId} />
      </PaymentStripeProvider>
    </PaymentStore.Provider>
  );
};

export default PaymentModal;
