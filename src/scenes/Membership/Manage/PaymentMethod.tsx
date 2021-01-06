import deepequal from 'fast-deep-equal';
import React from 'react';

import Button from '@atoms/Button';
import Spinner from '@atoms/Spinner';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import usePaymentMethod from '@modals/Payment/usePaymentMethod';
import { IPaymentMethod } from '@store/entities';
import { useStoreActions, useStoreState } from '@store/Store';

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
  const loading = usePaymentMethod(true);

  return (
    <Card className="s-membership-manage-card--payment">
      <div>
        <h4>Payment Method</h4>
        <Spinner dark loading={loading} />
      </div>

      {!loading && <PaymentMethodContent />}
    </Card>
  );
};

export default PaymentMethodCard;
