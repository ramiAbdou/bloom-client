import { mutation, query } from 'gql-query-builder';

import { IUser } from '@store/entities';

// ## CHANGE COMMUNITY

export interface ChangeCommunityArgs {
  memberId: string;
}

export const CHANGE_COMMUNITY = mutation({
  operation: 'changeCommunity',
  variables: { memberId: { required: true } }
}).query;

// ## GET USER

export interface GetUserResult extends IUser {
  activeCommunityId: string;
}

export const GET_USER = query({
  fields: [
    'activeCommunityId',
    'email',
    'id',
    'firstName',
    'lastName',
    'pictureUrl',
    {
      members: [
        'autoRenew',
        'duesStatus',
        'id',
        'role',
        'status',
        {
          community: [
            'id',
            'encodedUrlName',
            'name',
            'logoUrl',
            'primaryColor',
            { integrations: ['mailchimpListId', 'stripeAccountId'] },
            { types: ['amount', 'id', 'name', 'isFree', 'recurrence'] }
          ]
        },
        { type: ['id'] }
      ]
    }
  ],
  operation: 'getUser'
}).query;

// ## IS LOGGED IN

export const IS_LOGGED_IN = query({ operation: 'isUserLoggedIn' }).query;

// ## LOGOUT

export const LOGOUT = mutation({ operation: 'logout' }).query;

// ## VERIFY LOGIN TOKEN

export const VERIFY_LOGIN_TOKEN = query({
  operation: 'verifyLoginToken',
  variables: { loginToken: { required: true } }
}).query;
