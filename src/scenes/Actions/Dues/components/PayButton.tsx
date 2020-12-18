import React from 'react';

import OutlineButton from '@components/Button/OutlineButton';
import PrimaryButton from '@components/Button/PrimaryButton';
import { LoadingProps } from '@constants';
import { useStoreActions, useStoreState } from '@store/Store';
import { useStripe } from '@stripe/react-stripe-js';
import Dues from '../Dues.store';

export default (props: LoadingProps) => {
  const memberTypeId = Dues.useStoreState((store) => store.memberTypeId);
  const closeModal = useStoreActions(({ modal }) => modal.closeModal);

  const amount: number = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[memberTypeId]?.amount;
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
      loadingText="Paying..."
      type="submit"
      {...props}
    >
      Pay ${amount}
    </PrimaryButton>
  );
};
