import { mutation, query } from 'gql-query-builder';

// ## APPLY FOR MEMBERSHIP

export interface ApplyForMembershipArgs {
  data: { questionId: string; value: any }[];
  email: string;
  urlName: string;
}

export const APPLY_FOR_MEMBERSHIP = mutation({
  fields: ['id'],
  operation: 'applyForMembership',
  variables: {
    data: { type: '[MemberDataInput!]!' },
    email: { required: true },
    urlName: { required: true }
  }
}).query;

// ## GET APPLICATION

export const GET_APPLICATION = query({
  fields: [
    'autoAccept',
    'id',
    'logoUrl',
    'name',
    'primaryColor',
    'urlName',
    { application: ['title', 'description'] },
    {
      questions: [
        'category',
        'description',
        'id',
        'inApplication',
        'options',
        'required',
        'title',
        'type'
      ]
    },
    { types: ['amount', 'id', 'isFree', 'name', 'recurrence'] }
  ],
  operation: 'getApplication',
  variables: { urlName: { required: true } }
}).query;
