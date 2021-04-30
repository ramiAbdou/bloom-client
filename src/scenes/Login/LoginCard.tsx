import React from 'react';

import Separator from '@components/atoms/Separator';
import useSendLoginLink from '@components/modals/CheckInModal/useSendLoginLink';
import Form from '@components/organisms/Form/Form';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { QuestionCategory, ShowProps } from '@util/constants';
import LoginCardGoogleButton from './LoginCardGoogleButton';
import LoginCardGoogleErrorMessage from './LoginCardGoogleErrorMessage';

const LoginCardEmailForm: React.FC = () => {
  const sendLoginLink = useSendLoginLink();

  return (
    <Form onSubmit={sendLoginLink}>
      <FormShortText
        category={QuestionCategory.EMAIL}
        description="Or continue with your email address to receive a login link."
        placeholder="Email"
      />

      <FormSubmitButton loadingText="Sending...">
        Send Login Link
      </FormSubmitButton>
    </Form>
  );
};

const LoginCard: React.FC<ShowProps> = () => (
  <>
    <div>
      <LoginCardGoogleButton />
      <LoginCardGoogleErrorMessage />
    </div>

    <Separator margin={24} />
    <LoginCardEmailForm />
  </>
);

export default LoginCard;
