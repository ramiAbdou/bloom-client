import React from 'react';

import Button from '@components/Button/Button';
import Card from '@components/Elements/Card/Card';
import { ModalType } from '@constants';
import { useStoreActions } from '@store/Store';

const PaymentMethodContent = () => {
  return (
    <>
      <p>Visa ending in 2280</p>
      <p>Expires: 08/2022 * ZIP: 91789</p>
    </>
  );
};

const PaymentMethodCard = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(ModalType.UPDATE_PAYMENT_METHOD);

  return (
    <Card className="s-membership-manage-card--payment">
      <h4>Payment Method</h4>
      <PaymentMethodContent />

      <Button fit outline onClick={onClick}>
        Update Payment Method
      </Button>
    </Card>
  );
};

export default PaymentMethodCard;
