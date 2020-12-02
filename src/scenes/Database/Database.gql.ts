/**
 * @fileoverview GraphQL: Database
 * @author Rami Abdou
 */

import { mutation, query } from 'gql-query-builder';

export const DELETE_MEMBERSHIPS = mutation({
  operation: 'deleteMemberships',
  variables: { membershipIds: { required: true, type: '[String!]' } }
}).query;

export const GET_ADMINS = query({
  fields: [
    'id',
    { memberships: ['id', { user: ['id', 'firstName', 'lastName', 'email'] }] }
  ],
  operation: 'getAdmins'
}).query;

export const GET_DATABASE = query({
  fields: [
    'id',
    { questions: ['category', 'id', 'title', 'type'] },
    { memberships: ['id', { allData: ['questionId', 'value'] }] }
  ],
  operation: 'getDatabase'
}).query;

export const TOGGLE_ADMINS = mutation({
  operation: 'toggleAdmins',
  variables: { membershipIds: { required: true, type: '[String!]' } }
}).query;

export const CREATE_MEMBERSHIPS = mutation({
  fields: ['role', { user: ['id', 'firstName', 'lastName', 'email'] }],
  operation: 'createMemberships',
  variables: { members: { required: true, type: '[NewMemberInput!]' } }
}).query;

export const RENAME_QUESTION = mutation({
  fields: ['id'],
  operation: 'renameQuestion',
  variables: { id: { required: true }, title: { required: true } }
}).query;
