import React from 'react';

import Button, { ButtonProps } from '@components/Button/Button';
import Form from '../Form.store';

export default ({ disabled, loadingText, ...props }: ButtonProps) => {
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const isLoading = Form.useStoreState((store) => store.isLoading);

  return (
    <Button
      fill
      large
      primary
      disabled={disabled || !isCompleted}
      loading={isLoading}
      loadingText={loadingText ?? 'Submitting...'}
      type="submit"
      {...props}
    />
  );
};
