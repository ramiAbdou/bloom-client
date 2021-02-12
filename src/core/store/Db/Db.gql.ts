import { mutation, query } from 'gql-query-builder';

import { PopulateArgs } from '@constants';

// ## COMMUNITY

export const GET_COMMUNITY = query({
  fields: ['autoAccept', 'id', 'logoUrl', 'name', 'primaryColor', 'urlName'],
  operation: 'getCommunity'
}).query;

// ## INTEGRATIONS

export const GET_INTEGRATIONS = query({
  fields: [
    'id',
    'isMailchimpAuthenticated',
    'mailchimpListId',
    'mailchimpListName',
    'stripeAccountId',
    { community: ['id'] },
    { mailchimpLists: ['id', 'name'] }
  ],
  operation: 'getIntegrations'
}).query;

// ## GET MEMBER

export interface GetMemberArgs {
  memberId?: string;
}

export const GET_MEMBER = query({
  fields: [
    'autoRenew',
    'bio',
    'id',
    'isDuesActive',
    'role',
    'status',
    { community: ['id'] },
    { type: ['id'] },
    { user: ['id'] }
  ],
  operation: 'getMember',
  variables: { memberId: { required: false } }
}).query;

// ## GET MEMBER DATA

export interface GetMemberDataArgs {
  memberId?: string;
}

export const GET_MEMBER_DATA = query({
  fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
  operation: 'getMemberData',
  variables: { memberId: { required: false } }
}).query;

// ## GET QUESTIONS

export const GET_QUESTIONS = query({
  fields: [
    'category',
    'id',
    'inDirectoryCard',
    'inExpandedDirectoryCard',
    'options',
    'title',
    'type',
    { community: ['id'] }
  ],
  operation: 'getQuestions'
}).query;

// ## GET TYPES

export const GET_TYPES = query({
  fields: [
    'amount',
    'id',
    'isFree',
    'name',
    'recurrence',
    { community: ['id'] }
  ],
  operation: 'getTypes',
  variables: { urlName: { required: false } }
}).query;

// ## GET USER

export interface GetUserArgs extends PopulateArgs {
  userId?: string;
}

export const GET_USER = query({
  fields: [
    'createdAt',
    'email',
    'facebookUrl',
    'firstName',
    'id',
    'instagramUrl',
    'lastName',
    'linkedInUrl',
    'pictureUrl',
    'twitterUrl',
    { members: ['joinedAt', 'id', { community: ['id', 'logoUrl', 'urlName'] }] }
  ],
  operation: 'getUser',
  variables: {
    populate: { required: false, type: '[String!]' },
    userId: { required: false }
  }
}).query;

// ## IS LOGGED IN

export const IS_USER_LOGGED_IN = query({ operation: 'isUserLoggedIn' }).query;

// ## LOGOUT

export const LOGOUT = mutation({ operation: 'logout' }).query;

// ## VERIFY TOKEN

export interface VerifyTokenArgs {
  token: string;
}

export const VERIFY_TOKEN = query({
  operation: 'verifyToken',
  variables: { token: { required: true } }
}).query;
