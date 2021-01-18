import day from 'dayjs';
import { motion } from 'framer-motion';
import React from 'react';

import Separator from '@atoms/Separator';
import Row from '@containers/Row/Row';
import FormStore from '@organisms/Form/Form.store';
import PaymentFormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import FormPage from '@organisms/Form/FormPage';
import ModalContentContainer from '@organisms/Modal/ModalContentContainer';
import { IMemberType } from '@store/entities';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import InformationCard from '../../containers/Card/InformationCard';
import PaymentStore from './Payment.store';
import PaymentFinishButton from './PaymentFinishButton';

const PaymentFinishScreenToggle: React.FC = () => {
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);

  const autoRenew = FormStore.useStoreState(({ getItem }) =>
    getItem({ id: 'autoRenew' })
  )?.value;

  const showToggle: boolean = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    const type: IMemberType = byTypeId[typeId];

    // Don't show toggle if auto renew was already enabled (which is the
    // default status) or if the type is free.
    return (
      !db.member.autoRenew && !type.isFree && type.recurrence !== 'LIFETIME'
    );
  });

  const nextPaymentMessage: string = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    const { recurrence }: IMemberType = byTypeId[typeId];

    if (autoRenew) {
      const nextPaymentDate = day().format('MMMM Do');
      return `Membership will auto-renew on ${nextPaymentDate} every year.`;
    }

    const nextPaymentDate = day()
      .add(1, recurrence === 'YEARLY' ? 'y' : 'month')
      .format('MMMM D, YYYY');

    return `Next payment will be due on ${nextPaymentDate}.`;
  });

  if (!showToggle) return null;

  return (
    <>
      <Separator margin={24} />

      <FormItem
        value
        description={nextPaymentMessage}
        id="autoRenew"
        page="FINISH"
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

  const selectedTypeName: string = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;
    return byTypeId[typeId].name;
  });

  const brand = useStoreState(({ db }) => db.member.paymentMethod?.brand);
  const last4 = useStoreState(({ db }) => db.member.paymentMethod?.last4);

  const expirationDate = useStoreState(
    ({ db }) => db.member.paymentMethod?.expirationDate
  );

  const description = useStoreState(({ db }) => {
    const { byId: byTypeId } = db.entities.types;

    const selectedType: IMemberType = byTypeId[typeId];

    const { amount, recurrence } = selectedType;

    // Formats the amount with FREE if the amount is 0.
    const amountString = amount ? `$${amount / 100}` : 'FREE';

    // Construct string "Per" timespan based on the recurrence.
    const recurrenceString = takeFirst([
      [recurrence === 'YEARLY', 'Per Year'],
      [recurrence === 'MONTHLY', 'Per Month'],
      [recurrence === 'LIFETIME', 'Lifetime']
    ]);

    return `${amountString} ${recurrenceString}`;
  });

  return (
    <>
      <ModalContentContainer>
        <Row>
          <InformationCard description={description} title={selectedTypeName} />
          <InformationCard
            description={`Expires ${expirationDate}`}
            show={!!last4 && !isFree}
            title={`${brand} Ending in ${last4}`}
          />
        </Row>

        <PaymentFinishScreenToggle />
      </ModalContentContainer>
      <PaymentFormErrorMessage />
      <PaymentFinishButton />
    </>
  );
};

const PaymentFinishScreen: React.FC = () => (
  <FormPage id="FINISH">
    <motion.div
      animate={{ x: 0 }}
      initial={{ x: 50 }}
      transition={{ duration: 0.2 }}
    >
      <PaymentFinishScreenContent />
    </motion.div>
  </FormPage>
);

export default PaymentFinishScreen;
