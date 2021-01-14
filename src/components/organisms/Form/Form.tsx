import deepequal from 'fast-deep-equal';
import React, { useCallback } from 'react';

import { cx } from '@util/util';
import FormStore, { formModel } from './Form.store';
import { FormItemData, FormProps } from './Form.types';
import { validateItems } from './Form.util';

const FormContent: React.FC<Omit<FormProps, 'questions'>> = ({
  className,
  children,
  onSubmit
}) => {
  const validateOnSubmit = FormStore.useStoreState(
    (store) => store.options?.validateOnSubmit
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
        let validatedItems: FormItemData[] = validateOnSubmit
          ? validateItems(items)
          : items;

        validatedItems = validatedItems.filter(
          ({ initialValue, value }: FormItemData) =>
            !deepequal(initialValue, value)
        );

        if (validatedItems.some(({ errorMessage }) => !!errorMessage)) {
          setItemErrorMessages(validatedItems);
          return;
        }

        onSubmit({
          items: validatedItems,
          setErrorMessage: setError,
          setIsLoading
        });
      }
    },
    [items, validateOnSubmit]
  );

  const css = cx({ [className]: className, 'o-form': true });

  return (
    <form className={css} onSubmit={onFormSubmit}>
      {children}
    </form>
  );
};

const Form: React.FC<FormProps> = ({ options, pages, ...props }: FormProps) => (
  <FormStore.Provider runtimeModel={{ ...formModel, options, pages }}>
    <FormContent {...props} />
  </FormStore.Provider>
);

export default Form;
