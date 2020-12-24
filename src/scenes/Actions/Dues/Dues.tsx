import React from 'react';

import FormErrorMessage from '@components/Form/components/ErrorMessage';
import FormContent from '@components/Form/Content';
import Form from '@components/Form/Form';
import Modal from '@components/Modal/Modal';
import { ModalType } from '@constants';
import { useStoreState } from '@store/Store';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import DuesDescription from './components/Description';
import PayButton from './components/PayButton';
import DuesTypeOptions from './components/TypeOptions';
import DuesContainer from './containers/Dues';
import Dues from './Dues.store';
import useCreateSubscription from './hooks/useCreateSubscription';

const options: StripeCardElementOptions = {
  classes: {
    base: 'c-misc-input',
    empty: 'c-misc-input',
    focus: 'c-misc-input--focus',
    invalid: 'c-misc-input--error'
  },
  iconStyle: 'solid',
  style: { base: { fontFamily: 'Muli', fontSize: '15px', fontWeight: '700' } }
};

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
    <Modal locked id={ModalType.PAY_DUES}>
      <Form
        className="s-actions-dues"
        questions={[
          {
            placeholder: 'Name on Card',
            title: 'Name on Card',
            type: 'SHORT_TEXT'
          },
          {
            node: <CardElement options={options} />,
            title: 'Credit or Debit Card'
          }
        ]}
        onSubmit={createSubscription}
      >
        <h1>Pay Dues</h1>
        <DuesDescription />
        <DuesTypeOptions />
        {!isFree && <FormContent />}
        <FormErrorMessage />
        <PayButton />
      </Form>
    </Modal>
  );
};

export default () => (
  <DuesContainer>
    <DuesModalContent />
  </DuesContainer>
);
