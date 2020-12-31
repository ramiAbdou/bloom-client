import day from 'dayjs';
import React from 'react';

import { useStoreState } from '@store/Store';
import ChangePlan from '../../../pages/ChangePlan/ChangePlan.store';

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

const ChangePlanDescription = () => {
  const selectedTypeId = ChangePlan.useStoreState(
    (store) => store.selectedTypeId
  );

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

export default ChangePlanDescription;
