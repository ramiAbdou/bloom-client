import deline from 'deline';
import React from 'react';

import { LoadingProps } from '@constants';
import LoadingHeader from '@containers/Loading/LoadingHeader';
import { useStoreState } from '@store/Store';
import { takeFirst } from '@util/util';
import PaymentStore from './Payment.store';

const PaymentHeaderDescription: React.FC = () => {
  const screen = PaymentStore.useStoreState((store) => store.screen);

  const selectedTypeId = PaymentStore.useStoreState(
    (store) => store.selectedTypeId
  );

  const isFree: boolean = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.isFree;
  });

  const isUpdatingPaymentMethod =
    PaymentStore.useStoreState((store) => store.type) ===
    'UPDATE_PAYMENT_METHOD';

  const description = takeFirst([
    [
      isUpdatingPaymentMethod,
      deline`
        An update to your current subscription will be reflected on your next
        billing date.
      `
    ],
    [
      isFree,
      deline`
        Are you sure you want to downgrade your membership? You cannot undo
        this action.
      `
    ],
    [
      true,
      deline`
        We don’t have your payment information yet. Please enter your
        information to continue to the next step.
      `
    ]
  ]);

  if (screen !== 'CARD_FORM' && !isFree) return null;
  return <p>{description}</p>;
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
