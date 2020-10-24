/**
 * @fileoverview Component: LoginLinkContainer
 * @author Rami Abdou
 */

import React from 'react';

import { PrimaryButton } from '@components/Button';
import { Form } from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';

const SubmitButton = () => (
  <PrimaryButton className="s-login-submit-btn" title="Send Me a Login Link" />
);

export default () => (
  <Form.Provider
    initialData={{
      itemCSS: 's-login-form-item',
      questions: [
        {
          description:
            'Or continue with your email address to receive a login link.',
          placeholder: 'Email',
          title: 'Email',
          type: 'SHORT_TEXT'
        }
      ],
      submitForm: () => {}
    }}
  >
    <FormContent />
    <SubmitButton />
  </Form.Provider>
);
