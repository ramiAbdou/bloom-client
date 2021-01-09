import React, { useEffect } from 'react';

import { ModalType } from '@constants';
import useActiveRoute from '@hooks/useActiveRoute';
import Modal from '@organisms/Modal/Modal';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import PaymentStore, { PaymentModel, paymentModel } from './Payment.store';
import PaymentCardScreen from './PaymentCardScreen';
import PaymentConfirmationScreen from './PaymentConfirmationScreen';
import PaymentFinishScreen from './PaymentFinishScreen';
import PaymentHeader from './PaymentHeader';
import PaymentStripeProvider from './PaymentStripeProvider';
import useFetchDuesInformation from './useFetchDuesInformation';
import useInitPaymentScreen from './useInitPaymentScreen';
import usePaymentMethod from './usePaymentMethod';

const PaymentModalContent: React.FC = () => {
  const showPaymentContent = PaymentStore.useStoreState(
    ({ selectedTypeId, screen, type }) => {
      return type === 'UPDATE_PAYMENT_METHOD' || (!!selectedTypeId && !!screen);
    }
  );

  usePaymentMethod();
  useInitPaymentScreen();

  if (!showPaymentContent) return null;

  return (
    <>
      <PaymentCardScreen />
      <PaymentConfirmationScreen />
      <PaymentFinishScreen />
    </>
  );
};

const PaymentModalContainer: React.FC<Partial<PaymentModel>> = ({
  selectedTypeId
}) => {
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);
  const type = PaymentStore.useStoreState((store) => store.type);

  const clearOptions = PaymentStore.useStoreActions(
    (store) => store.clearOptions
  );

  const setSelectedTypeId = PaymentStore.useStoreActions(
    (store) => store.setSelectedTypeId
  );

  useEffect(() => {
    if (selectedTypeId !== typeId) setSelectedTypeId(selectedTypeId);
  }, [typeId, selectedTypeId]);

  const modalId: ModalType = takeFirst([
    [type === 'PAY_DUES', ModalType.PAY_DUES],
    [type === 'CHANGE_MEMBERSHIP', ModalType.CHANGE_MEMBERSHIP],
    [type === 'UPDATE_PAYMENT_METHOD', ModalType.UPDATE_PAYMENT_METHOD]
  ]);

  return (
    <Modal id={modalId} onClose={clearOptions}>
      <PaymentHeader />
      <PaymentModalContent />
    </Modal>
  );
};

const PaymentModal: React.FC<Partial<PaymentModel>> = ({
  selectedTypeId,
  type
}) => {
  const isAdmin = useStoreState(({ db }) => db.isAdmin);
  const route = useActiveRoute();

  useFetchDuesInformation();

  // Get the user and see if they've paid their dues or not.
  const duesStatus = useStoreState(({ db }) => db.member?.duesStatus);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isUserActive = duesStatus === 'ACTIVE';

  useEffect(() => {
    if (duesStatus && !isUserActive && !isAdmin && route !== 'membership') {
      showModal(ModalType.PAY_DUES);
    }
  }, [isUserActive, route]);

  if (type !== 'UPDATE_PAYMENT_METHOD' && !selectedTypeId) return null;

  return (
    <PaymentStore.Provider runtimeModel={{ ...paymentModel, type }}>
      <PaymentStripeProvider>
        <PaymentModalContainer selectedTypeId={selectedTypeId} />
      </PaymentStripeProvider>
    </PaymentStore.Provider>
  );
};

export default PaymentModal;
