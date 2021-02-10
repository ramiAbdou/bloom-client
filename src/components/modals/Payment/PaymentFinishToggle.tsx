import day from 'dayjs';
import React from 'react';

import Separator from '@atoms/Separator';
import Show from '@containers/Show';
import FormStore from '@organisms/Form/Form.store';
import FormToggle from '@organisms/Form/FormToggle';
import { IMemberType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import PaymentStore from './Payment.store';

const PaymentFinishToggle: React.FC = () => {
  const typeId = PaymentStore.useStoreState((store) => store.selectedTypeId);

  const autoRenew = FormStore.useStoreState(
    ({ items }) => items.AUTO_RENEW?.value
  );

  const show: boolean = useStoreState(({ db }) => {
    const type: IMemberType = db.byTypeId[typeId];

    // Don't show toggle if auto renew was already enabled (which is the
    // default status) or if the type is free.
    return (
      !db.member.autoRenew && !type.isFree && type.recurrence !== 'LIFETIME'
    );
  });

  const nextPaymentMessage: string = useStoreState(({ db }) => {
    const { recurrence }: IMemberType = db.byTypeId[typeId];

    if (autoRenew) {
      const nextPaymentDate = day().format('MMMM Do');
      return `Membership will auto-renew on ${nextPaymentDate} every year.`;
    }

    const nextPaymentDate = day()
      .add(1, recurrence === 'YEARLY' ? 'y' : 'month')
      .format('MMMM D, YYYY');

    return `Next payment will be due on ${nextPaymentDate}.`;
  });

  return (
    <Show show={show}>
      <Separator margin={24} />

      <FormToggle
        value
        description={nextPaymentMessage}
        id="AUTO_RENEW"
        title="Auto-Renew Membership"
      />
    </Show>
  );
};

export default PaymentFinishToggle;
