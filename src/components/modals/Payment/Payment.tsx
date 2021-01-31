import React, { useEffect } from 'react';

import { ModalType } from '@constants';
import useQuery from '@hooks/useQuery';
import useTopLevelRoute from '@hooks/useTopLevelRoute';
import Modal from '@organisms/Modal/Modal';
import Story from '@organisms/Story/Story';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_PAYMENT_INTEGRATIONS } from './Payment.gql';
import PaymentStore, { PaymentModel, paymentModel } from './Payment.store';
import PaymentCardPage from './PaymentCard';
import PaymentConfirmationPage from './PaymentConfirmation';
import PaymentFinishPage from './PaymentFinish';
import PaymentStripeProvider from './PaymentStripeProvider';

const PaymentModalContainer: React.FC<Partial<PaymentModel>> = ({
  selectedTypeId
}) => {
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);
  const type = PaymentStore.useStoreState((store) => store.type);
  const clearOptions = PaymentStore.useStoreActions((store) => store.clear);

  const setSelectedTypeId = PaymentStore.useStoreActions(
    (store) => store.setSelectedTypeId
  );

  useEffect(() => {
    if (selectedTypeId !== typeId) setSelectedTypeId(selectedTypeId);
  }, [typeId, selectedTypeId]);

  const onClose = () => clearOptions();

  return (
    <Modal id={type} onClose={onClose}>
      <Story>
        <PaymentCardPage />
        <PaymentFinishPage />
        <PaymentConfirmationPage />
      </Story>
    </Modal>
  );
};

const PaymentModal: React.FC<Partial<PaymentModel>> = ({
  selectedTypeId,
  type
}) => {
  const isAdmin = useStoreState(({ db }) => !!db.member.role);
  const route = useTopLevelRoute();

  const { loading } = useQuery<ICommunity>({
    name: 'getIntegrations',
    query: GET_PAYMENT_INTEGRATIONS,
    schema: Schema.COMMUNITY
  });

  // Get the user and see if they've paid their dues or not.
  const duesStatus = useStoreState(({ db }) => db.member?.duesStatus);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isUserActive = duesStatus === 'Active';

  useEffect(() => {
    if (!isAdmin && route !== 'membership' && duesStatus && !isUserActive) {
      showModal(ModalType.PAY_DUES);
    }
  }, [isUserActive, route]);

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
