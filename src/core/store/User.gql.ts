/**
 * @fileoverview GraphQL: User
 * @author Rami Abdou
 */

import { mutation, query } from 'gql-query-builder';

export const GET_USER = query({
  fields: [
    'email',
    'id',
    'firstName',
    'lastName',
    {
      memberships: [
        {
          community: ['id', 'encodedUrlName', 'name', 'logoUrl', 'primaryColor']
        },
        'id',
        'role',
        { type: ['name'] }
      ]
    }
  ],
  operation: 'getUser'
}).query;

export const IS_LOGGED_IN = query({ operation: 'isUserLoggedIn' }).query;

export const LOGOUT = mutation({ operation: 'logout' }).query;
