import { mutation, query } from 'gql-query-builder';

import { ICommunity } from '@store/entities';

export const APPLY_FOR_MEMBERSHIP = mutation({
  fields: ['id'],
  operation: 'applyForMembership',
  variables: {
    data: { type: '[MemberDataInput!]!' },
    email: { required: true },
    encodedUrlName: { required: true }
  }
}).query;

export interface GetApplicationResult extends ICommunity {
  application: {
    description: string;
    title: string;
  };
}

export const GET_APPLICATION = query({
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
  operation: 'getApplication',
  variables: { encodedUrlName: { required: true } }
}).query;
