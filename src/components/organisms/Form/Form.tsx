import deepequal from 'fast-deep-equal';
import React, { useCallback } from 'react';

import { cx } from '@util/util';
import FormStore, { formModel } from './Form.store';
import { FormProps } from './Form.types';
import { validateItems } from './Form.util';

const FormContent: React.FC<Omit<FormProps, 'questions'>> = ({
  className,
  children,
  onSubmit
}) => {
  const validateOnSubmit = FormStore.useStoreState(
    (store) => store.validateOnSubmit
  );

  const items = FormStore.useStoreState((store) => store.items, deepequal);
  const setError = FormStore.useStoreActions((store) => store.setErrorMessage);
  const setIsLoading = FormStore.useStoreActions((store) => store.setIsLoading);

  const setItemErrorMessages = FormStore.useStoreActions(
    (store) => store.setItemErrorMessages
  );

  const onFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (onSubmit) {
        const validatedItems = validateOnSubmit ? validateItems(items) : items;

        if (validatedItems.some(({ errorMessage }) => !!errorMessage)) {
          setItemErrorMessages(validatedItems);
          return;
        }

        onSubmit({
          items,
          setErrorMessage: setError,
          setIsLoading
        });
      }
    },
    [items, validateOnSubmit]
  );

  const css = cx({ 'o-form': true, [className]: className });

  return (
    <form className={css} onSubmit={onFormSubmit}>
      {children}
    </form>
  );
};

const Form: React.FC<FormProps> = ({
  disableValidation,
  validateOnSubmit,
  ...props
}: FormProps) => (
  <FormStore.Provider
    runtimeModel={{
      ...formModel,
      disableValidation,
      validateOnSubmit
    }}
  >
    <FormContent {...props} />
  </FormStore.Provider>
);

export default Form;
