import React from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import Form from '@components/Form/Form.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { useStripe } from '@stripe/react-stripe-js';
import Dues from '../Dues.store';

export default () => {
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);
  const memberTypeId = Dues.useStoreState((store) => store.memberTypeId);
  const isLoading = Form.useStoreState((store) => store.isLoading);

  const amount: number = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[memberTypeId]?.amount / 100;
  });

  const stripe = useStripe();

  if (amount === null || amount === undefined) return null;

  if (amount === 0) {
    return (
      <OutlineButton fill large onClick={() => closeModal()}>
        Close
      </OutlineButton>
    );
  }

  // Use a traditional checkout form.
  return (
    <PrimaryButton
      large
      disabled={!stripe}
      loading={isLoading}
      loadingText="Paying..."
      type="submit"
    >
      Pay ${amount}
    </PrimaryButton>
  );
};
