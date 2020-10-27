/**
 * @fileoverview GraphQL: User
 * @author Rami Abdou
 */

import { query } from 'gql-query-builder';

export const GET_USER = query({
  fields: [
    'email',
    'id',
    'firstName',
    'lastName',
    'pictureUrl',
    {
      memberships: [
        {
          community: ['id', 'encodedUrlName', 'name', 'logoUrl', 'primaryColor']
        },
        'id',
        'role'
      ]
    }
  ],
  operation: 'getUser'
}).query;

export const IS_LOGGED_IN = query({ operation: 'isUserLoggedIn' }).query;
