import React from 'react';
import validator from 'validator';

import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import SubmitButton from '@organisms/Form/FormSubmitButton';
import FormItem from '@organisms/Form/Item';
import useSendLoginLink from './useSendLoginLink';

const LoginCardEmailForm: React.FC = () => {
  const sendLoginLink = useSendLoginLink();

  return (
    <Form className="s-login-email-form" onSubmit={sendLoginLink}>
      <FormItem
        required
        category="EMAIL"
        description="Or continue with your email address to receive a login link."
        placeholder="Email"
        type="SHORT_TEXT"
        validate={(value: string) => validator.isEmail(value)}
      />

      <FormErrorMessage marginTop={0} />
      <SubmitButton loadingText="Sending...">Send Login Link</SubmitButton>
    </Form>
  );
};

export default LoginCardEmailForm;
