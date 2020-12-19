import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import validator from 'validator';

import FormContent from '@components/Form/Content';
import Form from '@components/Form/Form';
import FormStore from '@components/Form/Form.store';
import { FormItemData } from '@components/Form/Form.types';
import ErrorMessage from '@components/Misc/ErrorMessage';
import SubmitButton from './SubmitButton';
import useSendLoginLink from './useSendLoginLink';

const EmailFormContent = () => {
  const errorMessage = FormStore.useStoreState((store) => store.errorMessage);

  const setErrorMessage = FormStore.useStoreActions(
    (store) => store.setErrorMessage
  );

  // In the case that the user tries to log in with an expired login link,
  // we want to show the appropriate message.
  const cookie = Cookies.get('LOGIN_LINK_ERROR');
  if (cookie) Cookies.remove('LOGIN_LINK_ERROR');

  useEffect(() => {
    if (cookie === 'TOKEN_EXPIRED') {
      setErrorMessage('Your temporary login link has already expired.');
    }
  }, [cookie]);

  const sendLoginLink = useSendLoginLink();

  return (
    <form className="s-login-email-form" onSubmit={sendLoginLink}>
      <FormContent />
      <ErrorMessage marginTop={0} message={errorMessage} />
      <SubmitButton />
    </form>
  );
};

export default () => {
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
    <Form questions={questions}>
      <EmailFormContent />
    </Form>
  );
};
