import React from 'react';

import Button, { ButtonProps } from '@components/Button/Button';
import Form from '../Form.store';

export default ({
  disabled,
  fill,
  large,
  loadingText,
  ...props
}: ButtonProps) => {
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
