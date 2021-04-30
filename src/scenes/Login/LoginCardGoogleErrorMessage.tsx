import Cookies from 'js-cookie';
import React, { useEffect } from 'react';

import ErrorMessage from '@components/atoms/ErrorMessage';
import { ErrorContext, ErrorType } from '@util/constants.errors';

const LoginCardGoogleErrorMessage: React.FC = () => {
  // We store the error code in a cookie.
  const error: string = Cookies.get(ErrorContext.LOGIN_ERROR) as ErrorType;

  let message: string;

  switch (error) {
    case ErrorType.APPLICATION_REJECTED:
      message = 'You must be accepted into a commmunity before logging in.';
      break;

    case ErrorType.APPLICATION_PENDING:
      message =
        'You have pending member applications. Once they are accepted, you will be able to log in.';

      break;

    case ErrorType.NO_MEMBER_APPLICATIONS:
      message =
        'To log in, you must be a member of a community. To do that, you must fill out an application to the community.';

      break;

    case ErrorType.USER_NOT_FOUND:
      message =
        'You must apply and be accepted into a commmunity before logging in.';

      break;

    default:
      message = null;
  }

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
