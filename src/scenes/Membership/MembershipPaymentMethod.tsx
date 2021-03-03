import deepequal from 'fast-deep-equal';
import React from 'react';

import Card from '@containers/Card/Card';
import Show from '@containers/Show';
import { IPaymentMethod, RecurrenceType } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import MembershipPaymentMethodButton from './MembershipPaymentMethodButton';

const MembershipPaymentMethodEmpty: React.FC = () => {
  const isCardOnFile: boolean = useStoreState(
    ({ db }) => !!db.member.paymentMethod
  );

  return (
    <Show show={!isCardOnFile}>
      <p>No payment method added.</p>
    </Show>
  );
};

const MembershipPaymentMethodContent: React.FC = () => {
  const { brand, expirationDate, last4 }: IPaymentMethod = useStoreState(
    ({ db }) => db.member.paymentMethod ?? {},
    deepequal
  );

  return (
    <Show show={!!last4}>
      <p>
        {brand} ending in {last4}
      </p>

      <p>Expires: {expirationDate}</p>
    </Show>
  );
};

const MembershipPaymentMethod: React.FC = () => {
  const isDuesActive = useStoreState(({ db }) => db.member?.isDuesActive);

  const isLifetime: boolean = useStoreState(({ db }) => {
    return db.byTypeId[db.member?.type]?.recurrence === RecurrenceType.LIFETIME;
  });

  return (
    <Card
      className="s-membership-card s-membership-card--payment"
      show={!isDuesActive || !isLifetime}
      title="Payment Method"
    >
      <MembershipPaymentMethodContent />
      <MembershipPaymentMethodEmpty />
      <MembershipPaymentMethodButton />
    </Card>
  );
};

export default MembershipPaymentMethod;
