import { IMember } from '@store/Db/Db.entities';
import { ErrorType } from '@util/constants.errors';

interface GetCheckInErrorMessageArgs {
  error: ErrorType;
  owner?: IMember;
}

/**
 * Returns the login error message based on the cookie.
 */
export const getCheckInErrorMessage = (
  args: GetCheckInErrorMessageArgs
): string => {
  const { error, owner } = args;

  if (error === ErrorType.APPLICATION_REJECTED) {
    return 'You must be accepted into a commmunity before logging in.';
  }

  if (error === ErrorType.APPLICATION_PENDING) {
    return 'You have pending member applications. Once they are accepted, you will be able to log in.';
  }

  if (error === ErrorType.NO_MEMBER_APPLICATIONS) {
    return 'To log in, you must be a member of a community. To do that, you must fill out an application to the community.';
  }

  if (error === ErrorType.NOT_MEMBER) {
    return `This email is not registered as a member of this community. If you
      believe this is an error, please reach out to the owner,
      ${owner?.firstName} ${owner?.lastName} (${owner?.email}).
    `;
  }

  if (error === ErrorType.USER_NOT_FOUND) {
    return 'You must apply and be accepted into a commmunity before logging in.';
  }

  return error;
};
