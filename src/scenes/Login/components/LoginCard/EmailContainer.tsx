/**
 * @fileoverview Component: LoginLinkContainer
 * @author Rami Abdou
 */

import React from 'react';
import validator from 'validator';

import Form from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import SubmitButton from './SubmitButton';

export default () => (
  <Form.Provider
    initialData={{
      itemCSS: 's-login-form-item',
      questions: [
        {
          category: 'EMAIL',
          description:
            'Or continue with your email address to receive a login link.',
          placeholder: 'Email',
          required: true,
          title: 'Email',
          type: 'SHORT_TEXT',
          validate: (val: string) => validator.isEmail(val)
        }
      ]
    }}
  >
    <FormContent />
    <SubmitButton />
  </Form.Provider>
);
