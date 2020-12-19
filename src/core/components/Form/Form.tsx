import React from 'react';

import { ChildrenProps } from '@constants';
import Form, { formatQuestions, formModel } from './Form.store';
import { FormItemData } from './Form.types';

interface FormProps extends ChildrenProps {
  questions: FormItemData[];
}

export default ({ children, questions }: FormProps) => (
  <Form.Provider
    runtimeModel={{ ...formModel, items: formatQuestions(questions ?? []) }}
  >
    {children}
  </Form.Provider>
);
