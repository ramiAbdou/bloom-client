/**
 * @fileoverview Component: LoginLinkContainer
 * @author Rami Abdou
 */

import { useManualQuery } from 'graphql-hooks';
import React from 'react';
import validator from 'validator';

import { PrimaryButton } from '@components/Button';
import { PrimaryButtonProps } from '@components/Button/PrimaryButton';
import Form from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { getGraphQLError } from '@util/util';
import { SEND_TEMPORARY_LOGIN_LINK } from '../Login.gql';
import { useLogin } from '../Login.state';

const SubmitButton = (props: Partial<PrimaryButtonProps>) => (
  <PrimaryButton
    className="s-login-submit-btn"
    loadingText="Sending Link..."
    title="Send Me a Login Link"
    {...props}
  />
);

const Content = () => {
  const { email, setEmail, setHasLoginLinkSent } = useLogin();
  const value = Form.useStoreState(
    ({ items }) =>
      items.filter(({ category }) => category === 'EMAIL')[0]?.value
  );
  const isCompleted = Form.useStoreState((store) => store.isCompleted);

  if (email !== value) setEmail(value);

  const [sendTemporaryLoginLink, { error, loading }] = useManualQuery(
    SEND_TEMPORARY_LOGIN_LINK,
    {
      variables: { email: value }
    }
  );

  const onClick = async () => {
    const result = await sendTemporaryLoginLink();
    if (!result.loading && !result.error) setHasLoginLinkSent(true);
  };

  const message = getGraphQLError(error);

  return (
    <>
      <FormContent />
      <SubmitButton
        disabled={!isCompleted}
        isLoading={loading}
        onClick={onClick}
      />
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
          category: 'EMAIL',
          description:
            'Or continue with your email address to receive a login link.',
          placeholder: 'Email',
          required: true,
          title: 'Email',
          type: 'SHORT_TEXT',
          validate: (value: string) => validator.isEmail(value)
        }
      ]
    }}
  >
    <Content />
  </Form.Provider>
);
