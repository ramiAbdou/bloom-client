import { mutation, query } from 'gql-query-builder';

// ## GET MEMBER DATA

export interface GetMemberDataArgs {
  populate?: string[];
}

export const GET_MEMBER_DATA = query({
  fields: [
    'id',
    { data: ['id', 'value', { question: ['id'] }] },
    { community: ['id'] }
  ],
  operation: 'getMember',
  variables: { populate: { required: false, type: '[String!]' } }
}).query;

// ## GET MEMBER DATA QUESTIONS

export const GET_MEMBER_DATA_QUESTIONS = query({
  fields: [
    'id',
    'category',
    'description',
    'onlyInApplication',
    'options',
    'required',
    'title',
    'type',
    { community: ['id'] }
  ],
  operation: 'getQuestions'
}).query;

// ## UPDATE MEMBER DATA

interface MemberDataArgs {
  questionId: string;
  value: string[];
}

export interface UpdateMemberDataArgs {
  items: MemberDataArgs[];
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
