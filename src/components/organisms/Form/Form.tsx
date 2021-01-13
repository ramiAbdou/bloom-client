import deepequal from 'fast-deep-equal';
import React, { useCallback } from 'react';

import { cx } from '@util/util';
import FormStore, { formModel } from './Form.store';
import { FormProps } from './Form.types';
import { formatQuestions, validateItems } from './Form.util';

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

      const validatedItems = validateOnSubmit ? validateItems(items) : items;

      if (validatedItems.some(({ errorMessage }) => !!errorMessage)) {
        setItemErrorMessages(validatedItems);
        return;
      }

      if (onSubmit) {
        onSubmit({
          items: validatedItems,
          setErrorMessage: setError,
          setIsLoading
        });
      }
    },
    [items]
  );

  const css = cx({ 'c-form': true, [className]: className });

  return (
    <form className={css} onSubmit={onFormSubmit}>
      {children}
    </form>
  );
};

const Form: React.FC<FormProps> = ({
  disableValidation,
  questions,
  validateOnSubmit,
  ...props
}: FormProps) => (
  <FormStore.Provider
    runtimeModel={{
      ...formModel,
      disableValidation,
      items: formatQuestions(questions ?? []),
      validateOnSubmit
    }}
  >
    <FormContent {...props} />
  </FormStore.Provider>
);

export default Form;
