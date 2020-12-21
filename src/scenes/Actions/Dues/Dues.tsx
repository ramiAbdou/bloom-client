import React from 'react';

import FormErrorMessage from '@components/Form/components/ErrorMessage';
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
  const currentTypeId: string = Dues.useStoreState(
    (store) => store.memberTypeId
  );

  const isFree: boolean = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[currentTypeId]?.isFree;
  });

  const createSubscription = useCreateSubscription();

  // Will be null if the Stripe object hasn't been loaded yet.
  if (!createSubscription) return null;

  return (
    <Modal id={ModalType.PAY_DUES}>
      <Form className="s-actions-dues" onSubmit={createSubscription}>
        <h1>Pay Dues</h1>
        <DuesDescription />
        <DuesTypeOptions />

        {!isFree && (
          <div className="s-actions-dues-item">
            <p>Credit or Debit Card</p>
            <CardElement options={options} />
          </div>
        )}

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
