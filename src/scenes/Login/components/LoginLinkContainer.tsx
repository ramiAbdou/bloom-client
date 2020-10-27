/**
 * @fileoverview Component: LoginLinkContainer
 * @author Rami Abdou
 */

import { useManualQuery } from 'graphql-hooks';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
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
  const setEmail = Login.useStoreActions((actions) => actions.setEmail);
  const setHasLoginLinkSent = Login.useStoreActions(
    (actions) => actions.setHasLoginLinkSent
  );

  const isCompleted = Form.useStoreState((store) => store.isCompleted);
  const setSubmitForm = Form.useStoreActions((store) => store.setSubmitForm);
  const value = Form.useStoreState(
    ({ getItem }) => getItem({ category: 'EMAIL' })?.value
  );

  const [sendTemporaryLoginLink, { error, loading }] = useManualQuery(
    SEND_TEMPORARY_LOGIN_LINK,
    {
      variables: { email: value }
    }
  );

  const submitForm = async () => {
    const result = await sendTemporaryLoginLink();

    // sendTemporaryLoginLink returns a boolean when it's complete, so as long
    // as that is affirmative and there's no errors, we update the Login state.
    if (result.data && !result.loading && !result.error) {
      setEmail(value);
      setHasLoginLinkSent(true);
    }
  };

  useEffect(() => {
    setSubmitForm(submitForm);
  }, [value]);

  // In the case that the user tries to log in with an expired login link,
  // we want to show the appropriate message.
  const cookie = Cookies.get('LOGIN_LINK_ERROR');
  if (cookie) Cookies.remove('LOGIN_LINK_ERROR');
  const message =
    cookie === 'TOKEN_EXPIRED'
      ? 'Your temporary login link has already expired.'
      : // getGraphQLError returns the error code (eg: USER_NOT_FOUND) and
        // getLoginErrorMessage converts that to a more readable message.
        getLoginErrorMessage(getGraphQLError(error));

  return (
    <>
      <PrimaryButton
        className="s-login-submit-btn"
        disabled={!isCompleted}
        isLoading={loading}
        loadingText="Sending Link..."
        title="Send Login Link"
        onClick={submitForm}
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
          validate: (val: string) => validator.isEmail(val)
        }
      ]
    }}
  >
    <FormContent />
    <SubmitButton />
  </Form.Provider>
);
