import React from 'react';

import Button from '@components/Button/Button';
import Card from '@components/Elements/Card/Card';

const PaymentMethodContent = () => {
  return (
    <>
      <p>Visa ending in 2280</p>
      <p>Expires: 08/2022 * ZIP: 91789</p>
    </>
  );
};

const PaymentMethodCard = () => {
  return (
    <Card className="s-membership-manage-card--payment">
      <h4>Payment Method</h4>
      <PaymentMethodContent />
      <Button fit outline>
        Update Payment Method
      </Button>
    </Card>
  );
};

export default PaymentMethodCard;
