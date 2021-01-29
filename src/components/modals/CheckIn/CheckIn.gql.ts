import { mutation } from 'gql-query-builder';

// SEND LOGIN LINK

export interface SendLoginLinkArgs {
  communityId?: string;
  email: string;
}

export const SEND_LOGIN_LINK = mutation({
  operation: 'sendLoginLink',
  variables: { communityId: { required: false }, email: { required: true } }
}).query;
