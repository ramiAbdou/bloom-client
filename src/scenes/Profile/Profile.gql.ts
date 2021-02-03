import { mutation, query } from 'gql-query-builder';

import { IMemberData } from '@store/Db/entities';

// ## GET MEMBER DATA

export interface GetMemberDataArgs {
  populate?: string[];
}

export const GET_MEMBER_DATA = query({
  fields: [
    'id',
    { data: ['id', 'value', { question: ['id'] }] },
    {
      community: [
        'id',
        {
          questions: [
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

// ## UPDATE MEMBER DATA

export interface UpdateMemberDataArgs {
  items: Pick<IMemberData, 'id' | 'value'>[];
}

export const UPDATE_MEMBER_DATA = mutation({
  fields: ['id', 'value', { question: ['id'] }],
  operation: 'updateMemberData',
  variables: { items: { required: true, type: '[MemberDataArgs!]' } }
}).query;

// ## UPDATE USER

export interface UpdateUserArgs {
  bio?: string;
  firstName?: string;
  lastName?: string;
  pictureUrl?: string;
}

export const UPDATE_USER = mutation({
  fields: [
    'id',
    'bio',
    { user: ['id', 'firstName', 'lastName', 'pictureUrl'] }
  ],
  operation: 'updateUser',
  variables: {
    bio: { required: false },
    firstName: { required: false },
    lastName: { required: false },
    pictureUrl: { required: false }
  }
}).query;

// ## UPDATE USER SOCIALS

export interface UpdateUserSocialsArgs {
  facebookUrl?: string;
  instagramUrl?: string;
  linkedInUrl?: string;
  twitterUrl?: string;
}

export const UPDATE_USER_SOCIALS = mutation({
  fields: ['id', 'facebookUrl', 'instagramUrl', 'linkedInUrl', 'twitterUrl'],
  operation: 'updateUserSocials',
  variables: {
    facebookUrl: { required: false },
    instagramUrl: { required: false },
    linkedInUrl: { required: false },
    twitterUrl: { required: false }
  }
}).query;
