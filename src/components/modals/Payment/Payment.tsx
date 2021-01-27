import React, { useEffect } from 'react';

import { ModalType } from '@constants';
import useQuery from '@hooks/useQuery';
import useTopLevelRoute from '@hooks/useTopLevelRoute';
import Form from '@organisms/Form/Form';
import FormPage from '@organisms/Form/FormPage';
import Modal from '@organisms/Modal/Modal';
import { ICommunity } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import { GET_PAYMENT_INTEGRATIONS } from './Payment.gql';
import PaymentStore, { PaymentModel, paymentModel } from './Payment.store';
import { getPaymentPages } from './Payment.util';
import PaymentCardScreen from './PaymentCardScreen';
import PaymentFinishScreen from './PaymentFinishScreen';
import PaymentStripeProvider from './PaymentStripeProvider';
import useCreateLifetimePayment from './useCreateLifetimePayment';
import useCreateSubscription from './useCreateSubscription';
import useUpdatePaymentMethod from './useUpdatePaymentMethod';

const PaymentForm: React.FC<Partial<PaymentModel>> = () => {
  const prorationDate = PaymentStore.useStoreState(
    (store) => store.changeProrationDate
  );

  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);
  const type = PaymentStore.useStoreState((store) => store.type);

  const isCardOnFile = useStoreState(({ db }) => !!db.member.paymentMethod);

  const isFree: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return byTypeId[typeId]?.isFree;
  });

  const isLifetime: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return byTypeId[typeId]?.recurrence === 'LIFETIME';
  });

  const createSubscription = useCreateSubscription();
  const createLifetimePayment = useCreateLifetimePayment();
  const updatePaymentMethod = useUpdatePaymentMethod();

  const onSubmit = takeFirst([
    [type === 'UPDATE_PAYMENT_METHOD', updatePaymentMethod],
    [isLifetime, createLifetimePayment],
    [!isLifetime, createSubscription]
  ]);

  if (!onSubmit) return null;

  const pages = getPaymentPages({ isCardOnFile, isFree, type });

  return (
    <Form
      className="mo-payment"
      options={{
        disableValidation: type !== 'UPDATE_PAYMENT_METHOD',
        multiPage: true
      }}
      pages={pages}
      onSubmit={onSubmit}
      onSubmitDeps={[prorationDate, typeId]}
    >
      <PaymentCardScreen />
      <PaymentFinishScreen />
      <FormPage id="CONFIRMATION" />
    </Form>
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

  const onClose = () => clearOptions();

  return (
    <Modal id={type} onClose={onClose}>
      <PaymentForm />
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
