/**
 * @fileoverview Store: User
 * - Controls the logic for the authenticated user.
 * @author Rami Abdou
 */

import { Action, action, Computed, computed, Thunk, thunk } from 'easy-peasy';

import { Membership } from './Membership.store';

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  memberships?: Membership[];
  pictureUrl?: string;
};

export interface UserModel {
  email: string;
  firstName: string;
  fullName: Computed<UserModel, string>;
  id: string;
  init: Thunk<UserModel, User>;
  initials: Computed<UserModel, string>;
  lastName: string;
  pictureUrl?: string;
  setUser: Action<UserModel, User>;
}

export const userModel: UserModel = {
  email: '',
  firstName: '',
  fullName: computed(({ firstName, lastName }) => `${firstName} ${lastName}`),
  id: '',
  init: thunk((actions, user, { getStoreActions }) => {
    actions.setUser(user);

    // @ts-ignore b/c haven't figured out how to type-check this yet.
    const { membership } = getStoreActions();
    membership.init(user.memberships);
  }),
  initials: computed(
    ({ firstName, lastName }) => `${firstName[0]}${lastName[0]}`
  ),
  lastName: '',
  pictureUrl: null,
  setUser: action((state, { email, firstName, id, lastName }: User) => ({
    ...state,
    email,
    firstName,
    id,
    lastName
  }))
};
