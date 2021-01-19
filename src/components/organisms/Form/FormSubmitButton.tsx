import React from 'react';

import Button, { ButtonProps } from '@atoms/Button';
import { cx } from '@util/util';
import Form from './Form.store';

interface FormSubmitButtonProps extends ButtonProps {
  invisible?: boolean;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  className,
  disabled,
  fill,
  invisible,
  large,
  loadingText,
  ...props
}) => {
  Form.useStoreState((store) => console.log(store.items));
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const isLoading = Form.useStoreState((store) => store.isLoading);

  const css = cx('', {
    [className]: className,
    'o-form-submit--invisible': invisible
  });

  return (
    <Button
      primary
      className={css}
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
