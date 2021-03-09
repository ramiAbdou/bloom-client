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
  const isCompleted = FormStore.useStoreState((state) => state.isCompleted);
  const loading = FormStore.useStoreState((state) => state.isLoading);

  if (row) {
    fill = false;
    large = false;
    showError = false;
  }

  const css: string = cx('', {
    [className]: className,
    'o-form-submit--invisible': invisible
  });

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
        type="submit"
        {...props}
      />
    </>
  );
};

export default FormSubmitButton;
