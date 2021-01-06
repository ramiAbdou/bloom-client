import React, { useEffect } from 'react';

import { ModalType } from '@constants';
import LoadingHeader from '@molecules/LoadingHeader/LoadingHeader';
import Modal from '@organisms/Modal/Modal';
import PaymentDescription from '@organisms/Payment/components/Description';
import StripeProvider from '@organisms/Payment/containers/StripeProvider';
import PaymentForm from '@organisms/Payment/Payment';
import usePaymentMethod from '@scenes/Membership/usePaymentMethod';
import { useStoreActions, useStoreState } from '@store/Store';
import Dues from './Dues.store';
import DuesModalContainer from './DuesModalContainer';
import FinishDuesButton from './FinishButton';
import DuesTypeOptions from './TypeOptions';
import useCreateSubscription from './useCreateSubscription';

const DuesModalContent = () => {
  const selectedTypeId = Dues.useStoreState((store) => store.selectedTypeId);

  const createSubscription = useCreateSubscription();
  const { loading } = usePaymentMethod();

  // Will be null if the Stripe object hasn't been loaded yet.
  if (!createSubscription) return null;

  return (
    <Modal className="s-actions-dues" id={ModalType.PAY_DUES}>
      <LoadingHeader loading={loading} title="Pay Dues" />
      <PaymentDescription selectedTypeId={selectedTypeId} />
      <DuesTypeOptions />

      {!loading && (
        <PaymentForm
          SubmitButton={FinishDuesButton}
          selectedTypeId={selectedTypeId}
          onSubmit={createSubscription}
        />
      )}
    </Modal>
  );
};

const DuesModal: React.FC = () => {
  // Get the user and see if they've paid their dues or not.
  const duesStatus = useStoreState(({ db }) => db.member?.duesStatus);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const isUserActive = duesStatus === 'ACTIVE';

  useEffect(() => {
    if (duesStatus && !isUserActive) showModal(ModalType.PAY_DUES);
  }, [isUserActive]);

  return (
    <DuesModalContainer>
      <StripeProvider>
        <DuesModalContent />
      </StripeProvider>
    </DuesModalContainer>
  );
};

export default DuesModal;
