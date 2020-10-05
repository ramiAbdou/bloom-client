/**
 * @fileoverview Store: User
 * - Controls the logic for the authenticated user.
 * @author Rami Abdou
 */

import { Action, action, Computed, computed } from 'easy-peasy';

export type User = {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
};

export interface UserModel {
  email: string;
  firstName: string;
  fullName: Computed<UserModel, string>;
  id: string;
  init: Action<UserModel, User>;
  lastName: string;
}

export const userModel: UserModel = {
  email: '',
  firstName: '',
  fullName: computed(({ firstName, lastName }) => `${firstName} ${lastName}`),
  id: '',
  init: action((state, { email, firstName, id, lastName }) => ({
    ...state,
    email,
    firstName,
    id,
    lastName
  })),
  lastName: ''
};
