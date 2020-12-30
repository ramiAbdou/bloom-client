import { mutation, query } from 'gql-query-builder';

import { ICommunity, IQuestion } from '@store/entities';

export interface ApplyForMembershipArgs {
  data: { questionId: string; value: any }[];
  email: string;
  encodedUrlName: string;
}

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
  application: { description: string; questions: IQuestion[]; title: string };
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
