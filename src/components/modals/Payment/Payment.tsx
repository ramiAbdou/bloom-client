import React, { useEffect } from 'react';

import { ModalType } from '@constants';
import useActiveRoute from '@hooks/useActiveRoute';
import useQuery from '@hooks/useQuery';
import Form from '@organisms/Form/Form';
import FormNavigation from '@organisms/Form/FormNavigation';
import FormPage from '@organisms/Form/FormPage';
import Modal from '@organisms/Modal/Modal';
import { ICommunity } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_PAYMENT_INTEGRATIONS } from './Payment.gql';
import PaymentStore, { PaymentModel, paymentModel } from './Payment.store';
import { getPaymentPages } from './Payment.util';
import PaymentCardScreen from './PaymentCardScreen';
import PaymentFinishScreen from './PaymentFinishScreen';
import PaymentStripeProvider from './PaymentStripeProvider';
import useCreateLifetimePayment from './useCreateLifetimePayment';
import useCreateSubscription from './useCreateSubscription';

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

  const isCardOnFile = useStoreState(({ db }) => !!db.member.paymentMethod);

  const isFree: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return byTypeId[typeId]?.isFree;
  });

  const isLifetime: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return byTypeId[typeId]?.recurrence === 'LIFETIME';
  });

  useEffect(() => {
    if (selectedTypeId !== typeId) setSelectedTypeId(selectedTypeId);
  }, [typeId, selectedTypeId]);

  const createSubscription = useCreateSubscription();
  const createLifetimePayment = useCreateLifetimePayment();

  if (!createSubscription || !createLifetimePayment) return null;

  const onClose = () => clearOptions();
  const pages = getPaymentPages({ isCardOnFile, isFree, type });

  return (
    <Modal id={type} onClose={onClose}>
      <Form
        className="mo-payment"
        options={{
          disableValidation: type !== 'UPDATE_PAYMENT_METHOD',
          multiPage: true
        }}
        pages={pages}
        onSubmit={isLifetime ? createLifetimePayment : createSubscription}
      >
        <FormNavigation />
        <PaymentCardScreen />
        <PaymentFinishScreen />
        <FormPage id="CONFIRMATION" />
      </Form>
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
