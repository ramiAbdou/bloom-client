import { IUser } from '@store/Db/entities';
import { CheckInError } from './CheckIn.types';

interface GetCheckInErrorMessageArgs {
  error: CheckInError;
  owner?: IUser;
}

/**
 * Returns the login error message based on the cookie.
 */
export const getCheckInErrorMessage = ({
  error,
  owner
}: GetCheckInErrorMessageArgs) => {
  if (error === 'APPLICATION_REJECTED') {
    return 'You must be accepted into a commmunity before logging in.';
  }

  if (error === 'APPLICATION_PENDING') {
    return 'You have pending member applications. Once they are accepted, you will be able to log in.';
  }

  if (error === 'NOT_MEMBER') {
    return `This email is not registered as a member of this community. If you
      believe this is an error, please reach out to the owner,
      ${owner?.firstName} ${owner?.lastName} (${owner?.email}).
    `;
  }

  if (error === 'USER_NOT_FOUND') {
    return 'You must apply and be accepted into a commmunity before logging in.';
  }

  return error;
};
