export type CheckInError =
  | 'APPLICATION_PENDING'
  | 'APPLICATION_REJECTED'
  | 'NOT_MEMBER'
  | 'USER_NOT_FOUND';

export interface SendLoginLinkArgs {
  communityId?: string;
  email: string;
  pathname?: string;
}
