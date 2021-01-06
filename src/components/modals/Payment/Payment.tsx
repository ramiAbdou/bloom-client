import React, { useEffect } from 'react';

import { ModalType } from '@constants';
import Form from '@organisms/Form/Form';
import PaymentFormErrorMessage from '@organisms/Form/FormErrorMessage';
import Modal from '@organisms/Modal/Modal';
import ModalContentContainer from '@organisms/Modal/ModalContentContainer';
import Loading from '@store/Loading.store';
import { useStoreActions, useStoreState } from '@store/Store';
import PaymentStore, { paymentModel } from './Payment.store';
import PaymentCardForm from './PaymentCardForm';
import PaymentFinishButton from './PaymentFinishButton';
import PaymentHeader from './PaymentHeader';
import PaymentStripeProvider from './PaymentStripeProvider';
import useCreateSubscription from './useCreateSubscription';
import useFetchDuesInformation from './useFetchDuesInformation';
import usePaymentMethod from './usePaymentMethod';

const PaymentModalFormContent: React.FC = () => {
  const loading = Loading.useStoreState((store) => store.loading);
  if (loading) return null;

  return (
    <>
      <ModalContentContainer>
        <PaymentCardForm />
      </ModalContentContainer>

      <PaymentFormErrorMessage />
      <PaymentFinishButton />
    </>
  );
};

const PaymentModalContent: React.FC = () => {
  const createSubscription = useCreateSubscription();
  usePaymentMethod();

  // Will be null if the Stripe object hasn't been loaded yet.
  if (!createSubscription) return null;

  return (
    <Modal id={ModalType.PAY_DUES}>
      <PaymentHeader />
      <Form className="mo-payment" onSubmit={createSubscription}>
        <PaymentModalFormContent />
      </Form>
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
    <Loading.Provider>
      <PaymentStore.Provider
        runtimeModel={{ ...paymentModel, selectedTypeId: memberTypeId }}
      >
        <PaymentStripeProvider>
          <PaymentModalContent />
        </PaymentStripeProvider>
      </PaymentStore.Provider>
    </Loading.Provider>
  );
};

export default PaymentModal;
