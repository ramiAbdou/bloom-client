import { LoginError } from './Login.types';

/**
 * Returns the login error message based on the cookie.
 */
export const getLoginErrorMessage = (error: LoginError): string => {
  if (error === 'USER_NOT_FOUND') {
    return 'You must apply and be accepted into a commmunity before logging in.';
  }

  if (error === 'APPLICATION_REJECTED') {
    return 'You must be accepted into a commmunity before logging in.';
  }

  if (error === 'APPLICATION_PENDING') {
    return 'You have pending member applications. Once they are accepted, you will be able to log in.';
  }

  return error;
};
