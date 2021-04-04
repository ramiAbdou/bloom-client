import deepequal from 'fast-deep-equal';
import React from 'react';

import Card from '@containers/Card/Card';
import Show from '@containers/Show';
import { QueryResult } from '@gql/gql.types';
import { IPaymentMethod } from '@store/Db/Db.entities';
import { useStoreState } from '@store/Store';
import MembershipPaymentMethodButton from './MembershipPaymentMethodButton';
import useInitMembershipPaymentMethod from './useInitMembershipPaymentMethod';

const MembershipPaymentMethodEmpty: React.FC = () => {
  const isCardOnFile: boolean = useStoreState(
    ({ db }) => !!db.memberIntegrations.paymentMethod
  );

  return (
    <Show show={!isCardOnFile}>
      <p>No payment method added.</p>
    </Show>
  );
};

const MembershipPaymentMethodContent: React.FC = () => {
  const { brand, expirationDate, last4 }: IPaymentMethod = useStoreState(
    ({ db }) => db.memberIntegrations.paymentMethod ?? {},
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
  const { loading }: QueryResult = useInitMembershipPaymentMethod();

  return (
    <Card
      className="s-membership-card s-membership-card--payment"
      loading={loading}
      title="Payment Method"
    >
      <MembershipPaymentMethodContent />
      <MembershipPaymentMethodEmpty />
      <MembershipPaymentMethodButton />
    </Card>
  );
};

export default MembershipPaymentMethod;
