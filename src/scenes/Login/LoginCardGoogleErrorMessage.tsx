import Cookies from 'js-cookie';
import React, { useEffect } from 'react';

import { ApolloError } from '@apollo/client';
import ErrorMessage from '@components/atoms/ErrorMessage';
import { ErrorContext, ErrorType } from '@util/constants.errors';
import { getGraphQLError } from '@util/util';

const LoginCardGoogleErrorMessage: React.FC = () => {
  // We store the error code in a cookie.
  const error: string = Cookies.get(ErrorContext.LOGIN_ERROR) as ErrorType;

  const message: string = getGraphQLError(
    new ApolloError({ errorMessage: error })
  );

  // After we get the message, we remove the cookie so that the error doesn't
  // get shown again. We set a timeout to ensure that even if the component
  // re-renders, the message still appears.
  useEffect(() => {
    const timeout: NodeJS.Timeout = setTimeout(() => {
      if (error) Cookies.remove(ErrorContext.LOGIN_ERROR);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [error]);

  return <ErrorMessage marginBottom={0}>{message}</ErrorMessage>;
};

export default LoginCardGoogleErrorMessage;
