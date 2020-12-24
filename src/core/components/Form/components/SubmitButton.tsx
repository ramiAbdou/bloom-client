import React from 'react';

import Button, { ButtonProps } from '@components/Button/Button';
import Form from '../Form.store';

export default ({ disabled, ...props }: ButtonProps) => {
  const isCompleted = Form.useStoreState((store) => store.isCompleted);

  return (
    <Button
      fill
      large
      primary
      disabled={disabled || !isCompleted}
      type="submit"
      {...props}
    />
  );
};
