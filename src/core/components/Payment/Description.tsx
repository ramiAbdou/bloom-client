import day from 'dayjs';
import React from 'react';

import { useStoreState } from '@store/Store';

const FreeDescription = () => (
  <p>
    There are no dues to pay for a free membership! Click "Done" to confirm the
    Membership switch.
  </p>
);

const LifetimeDescription = () => (
  <p>
    Once your card is charged, you will be an active member for the rest of your
    life!
  </p>
);

const RecurringPaymentDescription = () => (
  <p>
    Once your card is charged, your membership will be active and will
    auto-renew on {day().format('MMMM D')} of every year. We’ll send you an
    email reminder 1 month before any auto-renewal.
  </p>
);

type PaymentDescriptionProps = { selectedTypeId: string };

/**
 * Returns the proper description based on the recurrence the amount of the
 * membership type. There are 3 cases that DuesDescription handles
 * - (Standard) Membership requires recurring payment.
 * - Membership is a LIFETIME membership.
 * - Membership is a FREE membership.
 */
const PaymentDescription = ({ selectedTypeId }: PaymentDescriptionProps) => {
  const recurrence = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.recurrence;
  });

  const isFree = useStoreState(({ db }) => {
    const { byId } = db.entities.types;
    return byId[selectedTypeId]?.isFree;
  });

  if (isFree) return <FreeDescription />;
  if (recurrence === 'LIFETIME') return <LifetimeDescription />;
  return <RecurringPaymentDescription />;
};

export default PaymentDescription;
