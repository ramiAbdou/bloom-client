import { mutation, query } from 'gql-query-builder';

// ## GET COMMUNITY

export const GET_COMMUNITY = query({
  fields: ['autoAccept', 'id', 'logoUrl', 'name', 'primaryColor', 'urlName'],
  operation: 'getCommunity'
}).query;

// ## GET MEMBER

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
  operation: 'getMember'
}).query;

// ## GET INTEGRATIONS

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

export interface GetUserArgs {
  urlName: string;
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
    { member: ['id', { community: ['id', 'primaryColor'] }] },
    { members: ['id', { community: ['id', 'logoUrl', 'urlName'] }] }
  ],
  operation: 'getUser',
  variables: { urlName: { required: false } }
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
