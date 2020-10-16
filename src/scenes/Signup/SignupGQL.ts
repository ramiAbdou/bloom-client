/**
 * @fileoverview GraphQL: Signup
 * @author Rami Abdou
 */

import { mutation, query } from 'gql-query-builder';

export const GET_MEMBERSHIP_FORM = query({
  fields: [
    'id',
    {
      application: [
        'title',
        'description',
        {
          questions: [
            'category',
            'description',
            'required',
            'options',
            'title',
            'type'
          ]
        }
      ]
    }
  ],
  operation: 'getCommunity',
  variables: { encodedUrlName: { required: true } }
}).query;

export const CREATE_MEMBERSHIP = mutation({
  fields: [{ user: ['id'] }],
  operation: 'applyForMembership',
  variables: { data: { type: '[MembershipDataInput!]!' } }
}).query;
