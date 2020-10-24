/**
 * @fileoverview Component: LoginLinkContainer
 * @author Rami Abdou
 */

import { useManualQuery } from 'graphql-hooks';
import React, { useState } from 'react';

import { PrimaryButton } from '@components/Button';
import { Form } from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { OnClickProps } from '../../../core/constants';
import { DOES_USER_EXIST } from '../Login.gql';

interface SubmitButtonProps extends OnClickProps {
  disabled?: boolean;
}

const SubmitButton = ({ disabled, onClick }: SubmitButtonProps) => (
  <PrimaryButton
    className="s-login-submit-btn"
    disabled={disabled}
    title="Send Me a Login Link"
    onClick={onClick}
  />
);

const Content = () => {
  const [message, setMessage] = useState('');
  const { value } = Form.useStoreState((store) => store.getItem('Email'));

  const [doesUserExist] = useManualQuery(DOES_USER_EXIST, {
    variables: { email: value }
  });

  const onClick = async () => {
    const { data } = await doesUserExist();
    if (!data.doesUserExist) setMessage('You must be a member of a community.');
    else if (message) setMessage('');
  };

  return (
    <>
      <FormContent />
      <SubmitButton disabled={!value} onClick={onClick} />
      {!!message && <ErrorMessage message={message} />}
    </>
  );
};

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
      ]
    }}
  >
    <Content />
  </Form.Provider>
);
