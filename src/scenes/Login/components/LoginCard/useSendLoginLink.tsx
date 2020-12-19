import { useManualQuery } from 'graphql-hooks';
import { useCallback, useEffect } from 'react';

import Form from '@components/Form/Form.store';
import { getGraphQLError } from '@util/util';
import { SEND_TEMPORARY_LOGIN_LINK } from '../../Login.gql';
import Login, { getLoginErrorMessage, LoginError } from '../../Login.store';

export default (): VoidFunction => {
  const setEmail = Login.useStoreActions((store) => store.setEmail);

  const setHasLoginLinkSent = Login.useStoreActions(
    (store) => store.setHasLoginLinkSent
  );

  const value: string = Form.useStoreState(
    ({ getItem }) => getItem({ category: 'EMAIL' })?.value
  );

  const setIsLoading = Form.useStoreActions((store) => store.setIsLoading);

  const setErrorMessage = Form.useStoreActions(
    (store) => store.setErrorMessage
  );

  const [sendTemporaryLoginLink, { error, loading }] = useManualQuery(
    SEND_TEMPORARY_LOGIN_LINK,
    {
      variables: { email: value }
    }
  );

  useEffect(() => {
    setIsLoading(loading);

    // getGraphQLError returns the error code (eg: USER_NOT_FOUND) and
    // getLoginErrorMessage converts that to a more readable message.
    const errorMessage = getLoginErrorMessage(
      getGraphQLError(error) as LoginError
    );

    if (errorMessage) setErrorMessage(errorMessage);
  }, [error, loading]);

  // The submit form function houses the updated value of the email, so we
  // update the function when the value changes.
  const sendLoginLink = useCallback(async () => {
    const { error: loginError } = await sendTemporaryLoginLink();

    // sendTemporaryLoginLink returns a boolean when it's complete, so as long
    // as that is affirmative and there's no errors, we update the Login state.
    if (!loginError) {
      setEmail(value);
      setHasLoginLinkSent(true);
    }
  }, [value]);

  return sendLoginLink;
};
