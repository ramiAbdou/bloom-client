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
        {
          community: [
            'id',
            'encodedUrlName',
            'name',
            'logoUrl',
            'primaryColor',
            { integrations: ['mailchimpListId', 'stripeAccountId'] }
          ]
        },
        'id',
        'role',
        'status',
        { type: ['name'] }
      ]
    }
  ],
  operation: 'getUser'
}).query;

export const IS_LOGGED_IN = query({ operation: 'isUserLoggedIn' }).query;
