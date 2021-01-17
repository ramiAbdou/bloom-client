import React, { useEffect } from 'react';

import { ModalType } from '@constants';
import useActiveRoute from '@hooks/useActiveRoute';
import useQuery from '@hooks/useQuery';
import Modal from '@organisms/Modal/Modal';
import { ICommunity, IMember } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import LoadingContainer from '../../containers/Loading/LoadingContainer';
import { GET_PAYMENT_INTEGRATIONS, GET_PAYMENT_METHOD } from './Payment.gql';
import PaymentStore, { PaymentModel, paymentModel } from './Payment.store';
import PaymentCardScreen from './PaymentCardScreen';
import PaymentConfirmationScreen from './PaymentConfirmationScreen';
import PaymentFinishScreen from './PaymentFinishScreen';
import PaymentHeader from './PaymentHeader';
import PaymentStripeProvider from './PaymentStripeProvider';
import useInitPaymentScreen from './useInitPaymentScreen';

const PaymentModalContent: React.FC = () => {
  const showPaymentContent = PaymentStore.useStoreState(
    ({ selectedTypeId, screen, type }) => {
      return type === 'UPDATE_PAYMENT_METHOD' || (!!selectedTypeId && !!screen);
    }
  );

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

  const { loading } = useQuery<IMember>({
    name: 'getMember',
    query: GET_PAYMENT_METHOD,
    schema: Schema.MEMBER
  });

  useEffect(() => {
    if (selectedTypeId !== typeId) setSelectedTypeId(selectedTypeId);
  }, [typeId, selectedTypeId]);

  const onClose = () => clearOptions();

  const modalId: ModalType = takeFirst([
    [type === 'PAY_DUES', ModalType.PAY_DUES],
    [type === 'CHANGE_MEMBERSHIP', ModalType.CHANGE_MEMBERSHIP],
    [type === 'UPDATE_PAYMENT_METHOD', ModalType.UPDATE_PAYMENT_METHOD]
  ]);

  return (
    <Modal id={modalId} onClose={onClose}>
      <LoadingContainer Header={PaymentHeader} loading={loading}>
        <PaymentModalContent />
      </LoadingContainer>
    </Modal>
  );
};

const PaymentModal: React.FC<Partial<PaymentModel>> = ({
  selectedTypeId,
  type
}) => {
  const isAdmin = useStoreState(({ db }) => !!db.member.role);
  const route = useActiveRoute();

  const { loading } = useQuery<ICommunity>({
    name: 'getIntegrations',
    query: GET_PAYMENT_INTEGRATIONS,
    schema: Schema.COMMUNITY
  });

  // Get the user and see if they've paid their dues or not.
  const duesStatus = useStoreState(({ db }) => db.member?.duesStatus);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isUserActive = duesStatus === 'ACTIVE';

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
