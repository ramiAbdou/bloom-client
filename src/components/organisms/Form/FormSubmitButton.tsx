import React from 'react';

import Button, { ButtonProps } from '@atoms/Button';
import Form from './Form.store';

const FormSubmitButton: React.FC<ButtonProps> = ({
  disabled,
  fill,
  large,
  loadingText,
  ...props
}) => {
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const isLoading = Form.useStoreState((store) => store.isLoading);

  return (
    <Button
      primary
      disabled={disabled || !isCompleted}
      fill={fill ?? true}
      large={large ?? true}
      loading={isLoading}
      loadingText={loadingText ?? 'Submitting...'}
      type="submit"
      {...props}
    />
  );
};

export default FormSubmitButton;
