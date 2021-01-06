import deepequal from 'fast-deep-equal';
import React, { useCallback, useEffect } from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import { cx } from '@util/util';
import FormStore, { formModel } from './Form.store';
import { FormItemData, OnFormSubmit } from './Form.types';
import { formatQuestions } from './Form.util';

export interface FormProps extends ChildrenProps, ClassNameProps {
  isEmpty?: boolean;
  questions?: FormItemData[];
  onSubmit?: OnFormSubmit;
}

const FormContent: React.FC<Omit<FormProps, 'questions'>> = ({
  className,
  children,
  isEmpty,
  onSubmit
}) => {
  const items = FormStore.useStoreState((store) => store.items, deepequal);
  const currentIsEmpty = FormStore.useStoreState((store) => store.isEmpty);
  const setError = FormStore.useStoreActions((store) => store.setErrorMessage);
  const setIsEmpty = FormStore.useStoreActions((store) => store.setIsEmpty);
  const setIsLoading = FormStore.useStoreActions((store) => store.setIsLoading);

  useEffect(() => {
    if (currentIsEmpty !== isEmpty) setIsEmpty(isEmpty);
  }, [isEmpty]);

  const onFormSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (onSubmit) {
        onSubmit({ items, setErrorMessage: setError, setIsLoading });
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

const Form: React.FC<FormProps> = ({ questions, ...props }: FormProps) => (
  <FormStore.Provider
    runtimeModel={{ ...formModel, items: formatQuestions(questions ?? []) }}
  >
    <FormContent {...props} />
  </FormStore.Provider>
);

export default Form;
