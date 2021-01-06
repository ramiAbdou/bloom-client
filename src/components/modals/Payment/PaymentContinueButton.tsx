import React from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import Button from '@atoms/Button';

const PaymentContinueButton: React.FC = () => {
  return (
    <Button primary>
      Continue
      <IoChevronForwardOutline />
    </Button>
  );
};

export default PaymentContinueButton;
