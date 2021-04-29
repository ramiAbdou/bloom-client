import React from 'react';
import validator from 'validator';

import Button, { ButtonProps } from '@components/atoms/Button/Button';
import { FormItemData, FormState } from '@components/organisms/Form/Form.types';
import { cx } from '@util/util';
import { useForm, useFormSelector } from './Form.state';
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
  const [{ loading }] = useForm();

  /**
   * Returns true if the form has been completed. This is the case if:
   * - The form has validation turned off (only for forms without ANY items).
   * - All items are validated. An item is validated if:
   *  - Item is not required.
   *  - Item is required and there is non-empty value.
   */
  const isCompleted: boolean = useFormSelector(
    ({ items, options }: FormState) => {
      const { disableValidation } = options ?? {};

      if (disableValidation) return true;
      if (!Object.keys(items)?.length) return false;

      const allValuesAreEmpty: boolean = Object.values(items).every(
        ({ value }) => !value
      );

      if (allValuesAreEmpty) return false;

      return Object.values(items).every(
        ({ required, value, validate }: FormItemData) => {
          if (required) {
            if (Array.isArray(value) && !value?.length) return false;
            if (!Array.isArray(value) && !value) return false;
          }

          if (validate === 'IS_EMAIL') {
            return validator.isEmail(value as string);
          }

          if (validate === 'IS_URL') return validator.isURL(value as string);

          return true;
        }
      );
    }
  );

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
        type="submit"
        {...props}
      />
    </>
  );
};

export default FormSubmitButton;
