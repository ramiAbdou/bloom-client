import deepequal from 'fast-deep-equal';
import React, { useCallback, useEffect } from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import Form, { formModel } from './Form.store';
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
  const items = Form.useStoreState((store) => store.items, deepequal);
  const currentIsEmpty = Form.useStoreState((store) => store.isEmpty);
  const setError = Form.useStoreActions((store) => store.setErrorMessage);
  const setIsEmpty = Form.useStoreActions((store) => store.setIsEmpty);
  const setIsLoading = Form.useStoreActions((store) => store.setIsLoading);

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

  return (
    <form className={className} onSubmit={onFormSubmit}>
      {children}
    </form>
  );
};

export default ({ questions, ...props }: FormProps) => (
  <Form.Provider
    runtimeModel={{ ...formModel, items: formatQuestions(questions ?? []) }}
  >
    <FormContent {...props} />
  </Form.Provider>
);
