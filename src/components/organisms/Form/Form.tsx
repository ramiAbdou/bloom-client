import deepequal from 'fast-deep-equal';
import React, { useCallback, useEffect } from 'react';

import { cx } from '@util/util';
import FormStore, { formModel } from './Form.store';
import { FormItemData, FormProps } from './Form.types';
import { validateItem } from './Form.util';

const FormContent: React.FC<Omit<FormProps, 'questions'>> = ({
  className,
  children,
  onSubmit,
  onSubmitDeps,
  pages
}) => {
  const items = FormStore.useStoreState((store) => store.items, deepequal);
  const goToNextPage = FormStore.useStoreActions((store) => store.goToNextPage);
  const setError = FormStore.useStoreActions((store) => store.setErrorMessage);
  const setIsLoading = FormStore.useStoreActions((store) => store.setIsLoading);
  const setPages = FormStore.useStoreActions((store) => store.setPages);

  const setItemErrorMessages = FormStore.useStoreActions(
    (store) => store.setItemErrorMessages
  );

  useEffect(() => {
    if (pages) setPages(pages);
  }, [pages]);

  const onFormSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!onSubmit) return;

      const validatedItems: FormItemData[] = items
        ?.map(validateItem)
        ?.filter(({ initialValue, value }: FormItemData) => {
          return !deepequal(initialValue, value);
        });

      if (validatedItems.some(({ errorMessage }) => !!errorMessage)) {
        setItemErrorMessages(validatedItems);
        return;
      }

      setError(null);
      setIsLoading(true);

      await onSubmit({
        goToNextPage,
        items: validatedItems,
        setErrorMessage: setError
      });

      setIsLoading(false);
    },
    [items, ...onSubmitDeps]
  );

  const css = cx('o-form', { [className]: className });

  return (
    <form className={css} onSubmit={onFormSubmit}>
      {children}
    </form>
  );
};

const Form: React.FC<FormProps> = ({ options, ...props }: FormProps) => (
  <FormStore.Provider runtimeModel={{ ...formModel, options }}>
    <FormContent {...props} />
  </FormStore.Provider>
);

export default Form;
