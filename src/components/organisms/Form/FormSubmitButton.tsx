import React from 'react';

import Button, { ButtonProps } from '@atoms/Button';
import { cx } from '@util/util';
import Form from './Form.store';

interface FormSubmitButtonProps extends ButtonProps {
  stickToBottom?: boolean;
}

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  className,
  disabled,
  fill,
  large,
  loadingText,
  stickToBottom,
  ...props
}) => {
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const isLoading = Form.useStoreState((store) => store.isLoading);

  const css = cx({
    'o-form-submit--sticky': stickToBottom,
    [className]: className
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
