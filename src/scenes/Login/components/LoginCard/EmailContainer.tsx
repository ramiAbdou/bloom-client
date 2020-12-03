/**
 * @fileoverview Component: LoginLinkContainer
 * @author Rami Abdou
 */

import React from 'react';
import validator from 'validator';

import Form, { formatQuestions, formModel } from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
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
          required: true,
          type: 'SHORT_TEXT',
          validate: (value: string) => validator.isEmail(value),
          value: 'Email'
        }
      ])
    }}
  >
    <FormContent />
    <SubmitButton />
  </Form.Provider>
);
