/**
 * @fileoverview GraphQL: Signup
 * @author Rami Abdou
 */

import { query } from 'gql-query-builder';

export const GET_PENDING_APPLICATIONS = query({
  fields: [
    { application: [{ questions: ['id', 'order', 'title', 'type'] }] },
    {
      pendingMemberships: [
        {
          application: [{ data: ['questionId', 'value'] }, 'membershipId']
        }
      ]
    }
  ],
  operation: 'getCommunity'
}).query;

export const VERIFY_LOGIN_TOKEN = query({
  operation: 'verifyLoginToken',
  variables: { token: { required: true } }
}).query;
