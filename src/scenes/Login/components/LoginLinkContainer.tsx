/**
 * @fileoverview Component: LoginLinkContainer
 * @author Rami Abdou
 */

import { useManualQuery } from 'graphql-hooks';
import React from 'react';
import validator from 'validator';

import { PrimaryButton } from '@components/Button';
import Form from '@components/Form/Form.store';
import FormContent from '@components/Form/FormContent';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { getGraphQLError } from '@util/util';
import { SEND_TEMPORARY_LOGIN_LINK } from '../Login.gql';
import Login from '../Login.store';
import { getLoginErrorMessage } from '../Login.util';

const SubmitButton = () => {
  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const setEmail = Login.useStoreActions((store) => store.setEmail);
  const setHasLoginLinkSent = Login.useStoreActions(
    (store) => store.setHasLoginLinkSent
  );
  const value = Form.useStoreState(
    ({ items }) =>
      items.filter(({ category }) => category === 'EMAIL')[0]?.value
  );

  const [sendTemporaryLoginLink, { error, loading }] = useManualQuery(
    SEND_TEMPORARY_LOGIN_LINK,
    {
      variables: { email: value }
    }
  );

  const onClick = async () => {
    const result = await sendTemporaryLoginLink();
    if (!result.loading && !result.error) {
      setEmail(value);
      setHasLoginLinkSent(true);
    }
  };

  // getGraphQLError returns the error code (eg: USER_NOT_FOUND) and
  // getLoginErrorMessage converts that to a more readable message.
  const message = getLoginErrorMessage(getGraphQLError(error));

  return (
    <>
      <PrimaryButton
        className="s-login-submit-btn"
        disabled={!isCompleted}
        isLoading={loading}
        loadingText="Sending Link..."
        title="Send Me a Login Link"
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
    <FormContent />
    <SubmitButton />
  </Form.Provider>
);
