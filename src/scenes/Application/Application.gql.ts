/**
 * @fileoverview GraphQL: Application
 * @author Rami Abdou
 */

import { mutation, query } from 'gql-query-builder';

export const GET_MEMBERSHIP_FORM = query({
  fields: [
    'autoAccept',
    'encodedUrlName',
    'id',
    'logoUrl',
    'name',
    'primaryColor',
    {
      application: [
        'title',
        'description',
        {
          questions: [
            'category',
            'description',
            'id',
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

export const APPLY_FOR_MEMBERSHIP = mutation({
  fields: ['id'],
  operation: 'applyForMembership',
  variables: {
    data: { type: '[MembershipDataInput!]!' },
    email: { required: true },
    encodedUrlName: { required: true }
  }
}).query;
