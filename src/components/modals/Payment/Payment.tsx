import React, { useEffect } from 'react';

import { ModalType } from '@constants';
import Modal from '@organisms/Modal/Modal';
import LoadingStore from '@store/Loading.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import PaymentStore, { paymentModel } from './Payment.store';
import PaymentCardScreen from './PaymentCardScreen';
import PaymentConfirmationScreen from './PaymentConfirmationScreen';
import PaymentFinishScreen from './PaymentFinishScreen';
import PaymentHeader from './PaymentHeader';
import PaymentStripeProvider from './PaymentStripeProvider';
import useFetchDuesInformation from './useFetchDuesInformation';
import useInitPaymentScreen from './useInitPaymentScreen';
import usePaymentMethod from './usePaymentMethod';

const PaymentModalContent: React.FC = () => {
  const type = PaymentStore.useStoreState((store) => store.type);

  usePaymentMethod();
  useInitPaymentScreen();

  const modalId: ModalType = takeFirst([
    [type === 'PAY_DUES', ModalType.PAY_DUES],
    [type === 'CHANGE_PLAN', ModalType.CHANGE_PLAN],
    [type === 'UPDATE_PAYMENT_METHOD', ModalType.UPDATE_PAYMENT_METHOD]
  ]);

  return (
    <Modal id={modalId}>
      <PaymentHeader />
      <PaymentCardScreen />
      <PaymentConfirmationScreen />
      <PaymentFinishScreen />
    </Modal>
  );
};

const PaymentModal: React.FC = () => {
  const memberTypeId: string = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[db.member.type]?.id;
  });

  useFetchDuesInformation();

  // Get the user and see if they've paid their dues or not.
  const duesStatus = useStoreState(({ db }) => db.member?.duesStatus);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isUserActive = duesStatus === 'ACTIVE';

  useEffect(() => {
    if (duesStatus && !isUserActive) showModal(ModalType.PAY_DUES);
  }, [isUserActive]);

  if (!memberTypeId) return null;

  return (
    <LoadingStore.Provider>
      <PaymentStore.Provider
        runtimeModel={{ ...paymentModel, selectedTypeId: memberTypeId }}
      >
        <PaymentStripeProvider>
          <PaymentModalContent />
        </PaymentStripeProvider>
      </PaymentStore.Provider>
    </LoadingStore.Provider>
  );
};

export default PaymentModal;
