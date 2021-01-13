import { mutation } from 'gql-query-builder';

import { IMember, IUser } from '@store/entities';

// ## UPDATE AUTO RENEW

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
