import { mutation, query } from 'gql-query-builder';

// ## APPLY FOR MEMBERSHIP

export interface ApplyForMembershipArgs {
  data: { questionId: string; value: any }[];
  email: string;
  memberTypeId?: string;
  paymentMethodId?: string;
  urlName: string;
}

export const APPLY_FOR_MEMBERSHIP = mutation({
  fields: ['id'],
  operation: 'applyForMembership',
  variables: {
    data: { type: '[MemberDataInput!]!' },
    email: { required: true },
    memberTypeId: { required: false },
    paymentMethodId: { required: false },
    urlName: { required: true }
  }
}).query;

// ## GET APPLICATION

export const GET_APPLICATION = query({
  fields: [
    'description',
    'id',
    'title',
    {
      community: [
        'autoAccept',
        'id',
        'logoUrl',
        'name',
        'primaryColor',
        'urlName',
        { integrations: ['stripeAccountId'] }
      ]
    }
  ],
  operation: 'getApplication',
  variables: { urlName: { required: true } }
}).query;
