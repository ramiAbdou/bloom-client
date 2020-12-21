import React from 'react';
import validator from 'validator';

import FormErrorMessage from '@components/Form/components/ErrorMessage';
import FormContent from '@components/Form/Content';
import Form from '@components/Form/Form';
import { FormItemData } from '@components/Form/Form.types';
import SubmitButton from './SubmitButton';
import useSendLoginLink from './useSendLoginLink';

export default () => {
  const sendLoginLink = useSendLoginLink();

  const questions: FormItemData[] = [
    {
      category: 'EMAIL',
      description:
        'Or continue with your email address to receive a login link.',
      placeholder: 'Email',
      required: true,
      type: 'SHORT_TEXT',
      validate: (value: string) => validator.isEmail(value)
    }
  ];

  return (
    <Form
      className="s-login-email-form"
      questions={questions}
      onSubmit={sendLoginLink}
    >
      <FormContent />
      <FormErrorMessage marginTop={0} />
      <SubmitButton />
    </Form>
  );
};
