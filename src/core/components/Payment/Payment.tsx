import React from 'react';

import { ChildrenProps } from '@constants';
import FormErrorMessage from '@organisms/Form/components/ErrorMessage';
import Form, { FormProps } from '@organisms/Form/Form';
import { useStoreState } from '@store/Store';
import CardOnFile from './components/CardOnFile';
import CardInfoContainer from './containers/CardInfo';
import { SelectedTypeProps } from './Payment.types';

interface PaymentFormProps
  extends Pick<FormProps, 'onSubmit'>,
    Partial<SelectedTypeProps>,
    ChildrenProps {
  isCardChanging?: boolean;
  SubmitButton?: React.FC;
}

const PaymentForm = ({
  children,
  isCardChanging,
  onSubmit,
  selectedTypeId,
  SubmitButton
}: PaymentFormProps) => {
  const isCardOnFile = useStoreState(
    ({ db }) => !!db.member.paymentMethod?.last4
  );

  const isFree: boolean = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.isFree;
  });

  return (
    <Form
      className="c-payment"
      isEmpty={isCardOnFile && !isCardChanging}
      onSubmit={onSubmit}
    >
      {children}
      <CardOnFile isCardChanging={isCardChanging} isFree={isFree} />
      <CardInfoContainer isCardChanging={isCardChanging} isFree={isFree} />
      <FormErrorMessage />
      <SubmitButton />
    </Form>
  );
};

export default PaymentForm;
