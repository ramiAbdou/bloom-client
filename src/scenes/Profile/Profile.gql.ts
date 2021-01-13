import { mutation, query } from 'gql-query-builder';

import { IMember, IUser } from '@store/entities';

// ## GET MEMBER DATA

export interface GetMemberDataArgs {
  populate?: string[];
}

export const GET_MEMBER_DATA = query({
  fields: [
    'id',
    {
      data: [
        'id',
        'value',
        {
          question: [
            'id',
            'category',
            'description',
            'onlyInApplication',
            'options',
            'required',
            'title',
            'type'
          ]
        }
      ]
    }
  ],
  operation: 'getMember',
  variables: { populate: { required: false, type: '[String!]' } }
}).query;

// ## UPDATE USER

export interface UpdateUserArgs {
  bio?: string;
  facebookUrl?: string;
  firstName?: string;
  instagramUrl?: string;
  lastName?: string;
  linkedInUrl?: string;
  twitterUrl?: string;
}

export interface UpdateUserResult {
  member: IMember;
  user: IUser;
}

export const UPDATE_USER = mutation({
  fields: [
    {
      user: [
        'id',
        'facebookUrl',
        'firstName',
        'instagramUrl',
        'lastName',
        'linkedInUrl',
        'twitterUrl'
      ]
    },
    { member: ['id', 'bio'] }
  ],
  operation: 'updateUser',
  variables: {
    bio: { required: false },
    facebookUrl: { required: false },
    firstName: { required: false },
    instagramUrl: { required: false },
    lastName: { required: false },
    linkedInUrl: { required: false },
    twitterUrl: { required: false }
  }
}).query;
