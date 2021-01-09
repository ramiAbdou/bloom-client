import { motion } from 'framer-motion';
import React from 'react';

import Separator from '@atoms/Separator';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import FormItem from '@organisms/Form/FormItem';
import ModalContentContainer from '@organisms/Modal/ModalContentContainer';
import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
import Form from '../../organisms/Form/Form';
import PaymentStore from './Payment.store';
import PaymentFinishButton from './PaymentFinishButton';
import useCreateSubscription from './useCreateSubscription';

const PaymentFinishScreenToggle: React.FC = () => {
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);

  const showToggle: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    const isTierFree = byTypeId[typeId].isFree;

    // Don't show toggle if auto renew was already enabled (which is the
    // default status) or if the type is free.
    return !db.member.autoRenew && !isTierFree;
  });

  if (!showToggle) return null;

  return (
    <>
      <Separator margin={24} />

      <FormItem
        description="Next payment will be due on December 20th, 2021."
        title="Auto-Renew Membership"
        type="TOGGLE"
      />
    </>
  );
};

const PaymentFinishScreenContent: React.FC = () => {
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);

  const isFree: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return byTypeId[typeId].isFree;
  });

  const cardString: string = useStoreState(({ db }) => {
    const { paymentMethod } = db.member;
    if (!paymentMethod) return null;
    return `${paymentMethod.brand} ending in ${paymentMethod.last4}`;
  });

  const typeString: string = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    const { amount, name, recurrence }: IMemberType = byTypeId[typeId];

    const amountString = amount ? amount / 100 : 'FREE';

    return `${name}, $${amountString}/${recurrence}`
      .replace('LIFETIME', 'life')
      .replace('MONTLY', 'mo')
      .replace('YEARLY', 'yr');
  });

  const createSubscription = useCreateSubscription();
  if (!createSubscription) return null;

  const cardItem: QuestionValueItemProps[] = !isFree
    ? [{ title: 'Credit or Debit Card', type: 'SHORT_TEXT', value: cardString }]
    : [];

  return (
    <Form className="mo-payment" onSubmit={createSubscription}>
      <ModalContentContainer>
        <QuestionValueList
          items={[
            {
              title: 'Membership Type',
              type: 'MULTIPLE_CHOICE',
              value: typeString
            },
            ...cardItem
          ]}
        />

        <PaymentFinishScreenToggle />
      </ModalContentContainer>

      <PaymentFinishButton />
    </Form>
  );
};

const PaymentFinishScreen: React.FC = () => {
  const screen = PaymentStore.useStoreState((store) => store.screen);

  if (screen !== 'FINISH') return null;

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: 50 }}
      transition={{ duration: 0.2 }}
    >
      <PaymentFinishScreenContent />
    </motion.div>
  );
};

export default PaymentFinishScreen;
