import React, { FormHTMLAttributes } from 'react';

import Form, { formatQuestions, formModel } from './Form.store';
import { FormItemData } from './Form.types';

interface FormProps extends Partial<FormHTMLAttributes<HTMLFormElement>> {
  questions: FormItemData[];
}

const FormContent = ({ children, onSubmit, ...props }: Partial<FormProps>) => {
  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(null);
  };

  return (
    <form onSubmit={onFormSubmit} {...props}>
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
