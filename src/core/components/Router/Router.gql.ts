import { query } from 'gql-query-builder';

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
            { types: ['id', 'name', 'isFree'] }
          ]
        },
        { type: ['id', 'name'] }
      ]
    }
  ],
  operation: 'getUser'
}).query;

export const IS_LOGGED_IN = query({ operation: 'isUserLoggedIn' }).query;
