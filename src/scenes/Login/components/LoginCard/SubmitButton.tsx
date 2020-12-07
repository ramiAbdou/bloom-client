import { useManualQuery } from 'graphql-hooks';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';

import PrimaryButton from '@components/Button/PrimaryButton';
import Form from '@components/Form/Form.store';
import ErrorMessage from '@components/Misc/ErrorMessage';
import { getGraphQLError } from '@util/util';
import { SEND_TEMPORARY_LOGIN_LINK } from '../../Login.gql';
import Login, { getLoginErrorMessage, LoginError } from '../../Login.store';

export default () => {
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
    if (!isCompleted) return;
    const { error: loginError } = await sendTemporaryLoginLink();

    // sendTemporaryLoginLink returns a boolean when it's complete, so as long
    // as that is affirmative and there's no errors, we update the Login state.
    if (!loginError) {
      setEmail(value);
      setHasLoginLinkSent(true);
    }
  };

  useEffect(() => {
    // The submit form function houses the updated value of the email, so we
    // update the function when the value changes.
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
        getLoginErrorMessage(getGraphQLError(error) as LoginError);

  return (
    <>
      <ErrorMessage marginTop={0} message={message} />

      <PrimaryButton
        large
        disabled={!isCompleted}
        loading={loading}
        loadingText="Sending Link..."
        title="Send Login Link"
        onClick={submitForm}
      />
    </>
  );
};
