import React from 'react';

import FormErrorMessage from '@components/Form/components/ErrorMessage';
import { useStoreState } from '@store/Store';
import DuesDescription from './components/Description';
import PayButton from './components/PayButton';
import DuesTypeOptions from './components/TypeOptions';
import DuesContainer from './containers/Dues';
import FormContent from './containers/FormContent';
import ModalContainer from './containers/Modal';
import Dues from './Dues.store';
import useCreateSubscription from './hooks/useCreateSubscription';

const DuesModalContent = () => {
  const selectedTypeId = Dues.useStoreState((store) => store.selectedTypeId);

  const isFree: boolean = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.isFree;
  });

  const createSubscription = useCreateSubscription();

  // Will be null if the Stripe object hasn't been loaded yet.
  if (!createSubscription) return null;

  return (
    <ModalContainer>
      <h1>Pay Dues</h1>
      <DuesDescription />
      <DuesTypeOptions />
      {!isFree && <FormContent />}
      <FormErrorMessage />
      <PayButton />
    </ModalContainer>
  );
};

export default () => (
  <DuesContainer>
    <DuesModalContent />
  </DuesContainer>
);
