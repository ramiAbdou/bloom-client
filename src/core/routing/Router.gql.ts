import { mutation, query } from 'gql-query-builder';

export const GET_USER = query({
  fields: [
    'email',
    'id',
    'firstName',
    'lastName',
    'pictureUrl',
    {
      members: [
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

export const IS_LOGGED_IN = query({ operation: 'isUserLoggedIn' }).query;

export const LOGOUT = mutation({ operation: 'logout' }).query;
