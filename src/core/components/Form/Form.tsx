import deepequal from 'fast-deep-equal';
import React, { useCallback } from 'react';

import { ChildrenProps, ClassNameProps } from '@constants';
import Form, { formatQuestions, formModel } from './Form.store';
import { FormItemData, OnFormSubmit } from './Form.types';

interface FormProps extends ChildrenProps, ClassNameProps {
  questions?: FormItemData[];
  onSubmit?: OnFormSubmit;
}

const FormContent = ({
  className,
  children,
  onSubmit
}: Omit<FormProps, 'questions'>) => {
  const items = Form.useStoreState((store) => store.items, deepequal);
  const setError = Form.useStoreActions((store) => store.setErrorMessage);
  const setIsLoading = Form.useStoreActions((store) => store.setIsLoading);

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
