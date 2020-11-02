/**
 * @fileoverview GraphQL: Signup
 * @author Rami Abdou
 */

import { query } from 'gql-query-builder';

export const GET_MEMBER_DATABASE = query({
  fields: [
    { application: [{ questions: ['id', 'order', 'title', 'type'] }] },
    {
      memberships: [
        { allData: [{ data: ['questionId', 'value'] }, 'membershipId'] }
      ]
    }
  ],
  operation: 'getMemberDatabase'
}).query;

export const GET_PENDING_APPLICATIONS = query({
  fields: [
    'id',
    { application: ['id', { questions: ['id', 'order', 'title', 'type'] }] },
    {
      pendingApplicants: ['id', { applicantData: ['questionId', 'value'] }]
    }
  ],
  operation: 'getApplicants'
}).query;

export const VERIFY_LOGIN_TOKEN = query({
  operation: 'verifyLoginToken',
  variables: { token: { required: true } }
}).query;
