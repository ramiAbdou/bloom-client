import { mutation, query } from 'gql-query-builder';

import { IUser } from '@store/Db/entities';

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

export interface GetUserResult extends IUser {
  activeCommunityId: string;
}

export const GET_USER = query({
  fields: [
    'activeCommunityId',
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
    {
      members: [
        'autoRenew',
        'bio',
        'id',
        'isDuesActive',
        'role',
        'status',
        {
          community: [
            'autoAccept',
            'id',
            'logoUrl',
            'name',
            'primaryColor',
            'urlName',
            { integrations: ['mailchimpListId', 'stripeAccountId'] },
            { types: ['amount', 'id', 'name', 'isFree', 'recurrence'] }
          ]
        },
        { paymentMethod: ['brand', 'expirationDate', 'last4', 'zipCode'] },
        { type: ['id'] }
      ]
    }
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
