import React from 'react';

import Button, { ButtonProps } from '@atoms/Button/Button';
import { cx } from '@util/util';
import FormStore from './Form.store';
import FormErrorMessage from './FormErrorMessage';

interface FormSubmitButtonProps extends ButtonProps {
  invisible?: boolean;
  row?: boolean;
  showError?: boolean;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  className,
  disabled,
  fill,
  invisible,
  large,
  loadingText,
  row,
  showError = true,
  ...props
}) => {
  const isCompleted: boolean = FormStore.useStoreState(
    (state) => state.isCompleted
  );

  const loading: boolean = FormStore.useStoreState((state) => state.isLoading);

  if (row) {
    fill = false;
    large = false;
    showError = false;
  }

  const css: string = cx(
    '',
    { 'o-form-submit--invisible': invisible },
    className
  );

  return (
    <>
      {showError && <FormErrorMessage />}

      <Button
        primary
        className={css}
        disabled={disabled || !isCompleted}
        fill={fill ?? true}
        large={large ?? true}
        loading={loading}
        loadingText={loadingText ?? 'Submitting...'}
        {...props}
      />
    </>
  );
};

export default FormSubmitButton;
