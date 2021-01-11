import deepequal from 'fast-deep-equal';
import React from 'react';

import Button from '@atoms/Button';
import Spinner from '@atoms/Spinner';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import useQuery from '@hooks/useQuery';
import { IMember, IPaymentMethod } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_PAYMENT_METHOD } from '../../components/modals/Payment/Payment.gql';

const PaymentMethodContent = () => {
  const paymentMethod: IPaymentMethod = useStoreState(
    ({ db }) => db.member.paymentMethod,
    deepequal
  );

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(ModalType.UPDATE_PAYMENT_METHOD);

  if (!paymentMethod) {
    return (
      <>
        <p>No payment method added.</p>
        <Button fill secondary onClick={onClick}>
          Add Payment Method
        </Button>
      </>
    );
  }

  const { brand, expirationDate, last4, zipCode } = paymentMethod;

  return (
    <>
      <p>
        {brand} ending in {last4}
      </p>

      <p>
        Expires: {expirationDate} &bull; ZIP Code: {zipCode}
      </p>

      <Button fill secondary onClick={onClick}>
        Update Payment Method
      </Button>
    </>
  );
};

const PaymentMethodCard = () => {
  const { loading } = useQuery<IMember>({
    name: 'getMember',
    query: GET_PAYMENT_METHOD,
    schema: Schema.MEMBER
  });

  return (
    <Card className="s-membership-card s-membership-card--payment">
      <div>
        <h3>Payment Method</h3>
        <Spinner dark loading={loading} />
      </div>

      {!loading && <PaymentMethodContent />}
    </Card>
  );
};

export default PaymentMethodCard;
