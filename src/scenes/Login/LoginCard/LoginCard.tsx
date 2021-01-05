import React from 'react';
import validator from 'validator';

import Separator from '@atoms/Separator';
import Logo from '@components/Misc/Logo';
import Network from '@components/Misc/Network';
import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import SubmitButton from '@organisms/Form/FormSubmitButton';
import FormItem from '@organisms/Form/Item';
import LoginCardGoogleContainer from './GoogleForm';
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

const LoginCardHeader: React.FC = () => (
  <div className="s-login-header">
    <div>
      <p>Welcome to</p>
      <Logo multiplier={1.25} />
    </div>

    <Network style={{ height: 151 }} />
  </div>
);

const LoginCard: React.FC = () => (
  <>
    <LoginCardHeader />
    <LoginCardGoogleContainer />
    <Separator />
    <LoginCardEmailForm />
  </>
);

export default LoginCard;
