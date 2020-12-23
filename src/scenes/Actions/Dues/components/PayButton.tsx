import React from 'react';

import Button from '@components/Button/Button';
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
      <Button fill large outline onClick={() => closeModal()}>
        Close
      </Button>
    );
  }

  // Use a traditional checkout form.
  return (
    <Button
      large
      primary
      disabled={!stripe}
      loading={isLoading}
      loadingText="Paying..."
      type="submit"
    >
      Pay ${amount}
    </Button>
  );
};
