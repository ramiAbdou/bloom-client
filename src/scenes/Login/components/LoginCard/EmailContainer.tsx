import React from 'react';
import validator from 'validator';

import FormContent from '@components/Form/Content';
import Form, { formatQuestions, formModel } from '@components/Form/Form.store';
import SubmitButton from './SubmitButton';

export default () => (
  <Form.Provider
    runtimeModel={{
      ...formModel,
      itemCSS: 's-login-form-item',
      items: formatQuestions([
        {
          category: 'EMAIL',
          description:
            'Or continue with your email address to receive a login link.',
          placeholder: 'Email',
          required: true,
          type: 'SHORT_TEXT',
          validate: (value: string) => validator.isEmail(value)
        }
      ])
    }}
  >
    <FormContent />
    <SubmitButton />
  </Form.Provider>
);
