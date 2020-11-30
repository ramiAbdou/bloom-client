/**
 * @fileoverview Store: AddMember
 * @author Rami Abdou
 */

import {
  Action,
  action,
  Computed,
  computed,
  createContextStore
} from 'easy-peasy';
import validator from 'validator';

import { IdProps } from '@constants';
import { uuid } from '@util/util';

interface AddMemberData extends IdProps {
  admin: boolean;
  email: string;
  error: string;
}

type UpdateEmailArgs = { id: string; email: string };

export type AddMemberModel = {
  addEmptyMember: Action<AddMemberModel>;
  clearErrors: Action<AddMemberModel>;
  clearMembers: Action<AddMemberModel>;
  getMember: Computed<AddMemberModel, (id: string) => AddMemberData, {}>;
  members: AddMemberData[];
  isShowingErrors: boolean;
  showErrors: Action<AddMemberModel>;
  toggleAdmin: Action<AddMemberModel, string>;
  updateEmail: Action<AddMemberModel, UpdateEmailArgs>;
};

const generateEmptyMember = (): AddMemberData => ({
  admin: false,
  email: '',
  error: 'This is not a valid email address.',
  id: uuid()
});

const addMemberModel: AddMemberModel = {
  addEmptyMember: action(({ members, ...state }) => ({
    ...state,
    isShowingErrors: false,
    members: [...members, generateEmptyMember()]
  })),

  clearErrors: action((state) => ({
    ...state,
    members: [generateEmptyMember()]
  })),

  clearMembers: action((state) => ({
    ...state,
    members: [generateEmptyMember()]
  })),

  getMember: computed(({ members }) => (id: string) =>
    members.find((member) => member.id === id)
  ),

  isShowingErrors: false,

  members: [generateEmptyMember()],

  showErrors: action((state) => ({ ...state, isShowingErrors: true })),

  toggleAdmin: action(({ members, ...state }, id: string) => {
    const index = members.findIndex((element) => element.id === id);
    const { admin, ...member } = members[index];

    return {
      ...state,
      members: [
        ...members.slice(0, index),
        { admin: !admin, ...member },
        ...members.slice(index + 1)
      ]
    };
  }),

  updateEmail: action(({ members, ...state }, { id, email }) => {
    const index = members.findIndex((element) => element.id === id);
    members[index] = {
      ...members[index],
      email,
      error: validator.isEmail(email)
        ? ''
        : 'This is not a valid email address.'
    };

    return { ...state, members };
  })
};

export default createContextStore<AddMemberModel>(addMemberModel, {
  disableImmer: true
});
