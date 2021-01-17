import day from 'dayjs';
import deline from 'deline';
import React from 'react';

import { LoadingProps } from '@constants';
import LoadingHeader from '@containers/Loading/LoadingHeader';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import PaymentStore from './Payment.store';

const PaymentHeaderDescription: React.FC = () => {
  const screen = PaymentStore.useStoreState((store) => store.screen);
  const modalType = PaymentStore.useStoreState((store) => store.type);

  const selectedTypeId = PaymentStore.useStoreState(
    (store) => store.selectedTypeId
  );

  const isFree: boolean = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.isFree;
  });

  const isLessThanCurrentType = useStoreState(({ db }) => {
    const { byId } = db.entities.types;

    const selectedAmount = byId[selectedTypeId]?.amount;
    const currentAmount = byId[db.member.type]?.amount;

    return (
      db.member.duesStatus === 'Active' &&
      !isFree &&
      selectedAmount < currentAmount
    );
  });

  const isLifetime = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.recurrence === 'LIFETIME';
  });

  const autoRenew = useStoreState(({ db }) => {
    return db.member.autoRenew && !isLifetime;
  });

  const description = takeFirst([
    [
      modalType === 'UPDATE_PAYMENT_METHOD',
      deline`
        An update to your current subscription will be reflected on your next
        billing date.
      `
    ],
    [
      screen === 'CARD_FORM',
      deline`
        We don’t have your payment information yet. Please enter your
        information to continue to the next step.
      `
    ],
    [
      screen === 'FINISH' && isLessThanCurrentType,
      `You won’t be charged until the next payment cycle on December 21st, 2021.`
    ],
    [
      screen === 'FINISH' && isFree,
      deline`
        Are you sure you want to downgrade your membership? You cannot undo
        this action.
      `
    ],
    [isLifetime, `This is 1-time payment, and you will be a member for life!`],
    [
      screen === 'FINISH' && autoRenew,
      `Membership will auto-renew on ${day().format('MMMM Do')} every year.`
    ]
  ]);

  return description ? <p>{description}</p> : null;
};

const PaymentHeader: React.FC<LoadingProps> = ({ loading }) => {
  const backButton = PaymentStore.useStoreState((store) => store.backButton);
  const screen = PaymentStore.useStoreState((store) => store.screen);
  const type = PaymentStore.useStoreState((store) => store.type);
  const setScreen = PaymentStore.useStoreActions((store) => store.setScreen);

  if (screen === 'CONFIRMATION') return null;

  const title = takeFirst([
    [type === 'CHANGE_MEMBERSHIP', 'Change Membership Plan'],
    [type === 'PAY_DUES', 'Pay Dues'],
    [type === 'UPDATE_PAYMENT_METHOD', 'Update Payment Method']
  ]);

  const onBack =
    backButton && screen === 'FINISH' ? () => setScreen('CARD_FORM') : null;

  return (
    <>
      <LoadingHeader loading={loading} title={title} onBack={onBack} />
      <PaymentHeaderDescription />
    </>
  );
};

export default PaymentHeader;
