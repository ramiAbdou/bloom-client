import { motion } from 'framer-motion';
import React from 'react';

import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import ModalContentContainer from '@organisms/Modal/ModalContentContainer';
import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
import Form from '../../organisms/Form/Form';
import PaymentStore from './Payment.store';
import PaymentFinishButton from './PaymentFinishButton';

const PaymentFinishScreen: React.FC = () => {
  const screen = PaymentStore.useStoreState((store) => store.screen);
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);

  const isFree: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return byTypeId[typeId].isFree;
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

  const cardString: string = useStoreState(({ db }) => {
    const { paymentMethod } = db.member;
    if (!paymentMethod) return null;
    return `${paymentMethod.brand} ending in ${paymentMethod.last4}`;
  });

  if (screen !== 'FINISH') return null;

  const cardItem: QuestionValueItemProps[] = !isFree
    ? [{ title: 'Credit or Debit Card', type: 'SHORT_TEXT', value: cardString }]
    : [];

  return (
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: 50 }}
      transition={{ duration: 0.2 }}
    >
      <Form className="mo-payment">
        <ModalContentContainer>
          <QuestionValueList
            large
            items={[
              {
                title: 'Membership Type',
                type: 'MULTIPLE_CHOICE',
                value: typeString
              },
              ...cardItem
            ]}
          />
        </ModalContentContainer>

        <PaymentFinishButton />
      </Form>
    </motion.div>
  );
};

export default PaymentFinishScreen;
