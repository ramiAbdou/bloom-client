import React, { useState } from 'react';
import { IoChevronForwardOutline } from 'react-icons/io5';

import Button from '@atoms/Button';
import { ButtonProps } from '@atoms/Button/Button';
import FormStore from './Form.store';

const FormContinueButton: React.FC<ButtonProps> = ({
  children,
  disabled,
  onClick,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const goToNextPage = FormStore.useStoreActions((store) => store.goToNextPage);

  const isPageCompleted = FormStore.useStoreState(
    (store) => store.isPageCompleted
  );

  const onContinue = async () => {
    if (onClick) {
      setLoading(true);
      await onClick(null);
      setLoading(false);
    }

    goToNextPage();
  };

  return (
    <Button
      fill
      large
      primary
      className="o-form-submit--continue"
      disabled={disabled || !isPageCompleted}
      loading={loading}
      onClick={onContinue}
      {...props}
    >
      {children}
      <IoChevronForwardOutline />
    </Button>
  );
};

export default FormContinueButton;
