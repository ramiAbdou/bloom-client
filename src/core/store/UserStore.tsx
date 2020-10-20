/**
 * @fileoverview Store: User
 * - Controls the logic for the authenticated user.
 * @author Rami Abdou
 */

import { Action, action, Computed, computed, Thunk, thunk } from 'easy-peasy';

import { Membership } from './MembershipStore';

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  memberships?: Membership[];
};

export interface UserModel {
  email: string;
  firstName: string;
  fullName: Computed<UserModel, string>;
  id: string;
  init: Thunk<UserModel, User>;
  lastName: string;
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
  lastName: '',
  setUser: action((state, { email, firstName, id, lastName }: User) => ({
    ...state,
    email,
    firstName,
    id,
    lastName
  }))
};
