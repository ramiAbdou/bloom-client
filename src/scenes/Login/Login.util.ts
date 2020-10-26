/**
 * @fileoverview Utility: Login
 * @author Rami Abdou
 */

import { LoginError } from '@constants';

/**
 * UTILITY: Returns the login error message based on the cookie.
 */
export const getLoginErrorMessage = (cookie: LoginError) => {
  if (cookie === 'USER_NOT_FOUND')
    return `You must apply and be accepted into a commmunity before logging in.`;
  if (cookie === 'APPLICATION_REJECTED')
    return `You must be accepted into a commmunity before logging in.`;
  if (cookie === 'APPLICATION_PENDING')
    return `You have pending membership applications. Once they are accepted, you will be able to log in.`;
  return null;
};
