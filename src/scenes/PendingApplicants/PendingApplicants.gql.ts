/**
 * @fileoverview GraphQL: Signup
 * @author Rami Abdou
 */

import { mutation } from 'gql-query-builder';

export const RESPOND_TO_MEMBERSHIPS = mutation({
  operation: 'respondToMemberships',
  variables: {
    membershipIds: { required: true, type: '[String!]' },
    response: { required: true }
  }
}).query;
