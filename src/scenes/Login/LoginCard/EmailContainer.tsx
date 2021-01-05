import React from 'react';
import validator from 'validator';

import FormErrorMessage from '@organisms/Form/ErrorMessage';
import Form from '@organisms/Form/Form';
import FormItem from '@organisms/Form/Item';
import SubmitButton from '@organisms/Form/SubmitButton';
import useSendLoginLink from './useSendLoginLink';

export default () => {
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
