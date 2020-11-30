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
  emailError: string;
  firstName: string;
  firstNameError: string;
  lastName: string;
  lastNameError: string;
}

type UpdateMemberArgs = {
  field: 'EMAIL' | 'FIRST_NAME' | 'LAST_NAME';
  id: string;
  value: string;
};

export type AddMemberModel = {
  addEmptyMember: Action<AddMemberModel>;
  clearMembers: Action<AddMemberModel>;
  getMember: Computed<AddMemberModel, (id: string) => AddMemberData, {}>;
  members: AddMemberData[];
  isShowingErrors: boolean;
  showErrors: Action<AddMemberModel>;
  toggleAdmin: Action<AddMemberModel, string>;
  updateMember: Action<AddMemberModel, UpdateMemberArgs>;
};

const generateEmptyMember = (): AddMemberData => ({
  admin: false,
  email: '',
  emailError: 'This is not a valid email address.',
  firstName: '',
  firstNameError: 'Please fill out a first name.',
  id: uuid(),
  lastName: '',
  lastNameError: 'Please fill out a last name.'
});

const addMemberModel: AddMemberModel = {
  addEmptyMember: action(({ members, ...state }) => ({
    ...state,
    isShowingErrors: false,
    members: [...members, generateEmptyMember()]
  })),

  clearMembers: action((state) => {
    console.log('HERE');
    return {
      ...state,
      isShowingErrors: false,
      members: [generateEmptyMember()]
    };
  }),

  getMember: computed(({ members }) => (id: string) =>
    members.find((member) => member.id === id)
  ),

  isShowingErrors: false,

  members: [generateEmptyMember()],

  showErrors: action((state) => ({ ...state, isShowingErrors: true })),

  toggleAdmin: action(({ members, ...state }, id: string) => {
    const index = members.findIndex((element) => element.id === id);
    const member = members[index];
    members[index] = { ...member, admin: !member.admin };
    return { ...state, members };
  }),

  updateMember: action(({ members, ...state }, { field, id, value }) => {
    const index = members.findIndex((element) => element.id === id);
    const member = members[index];

    if (field === 'EMAIL')
      members[index] = {
        ...member,
        email: value,
        emailError: validator.isEmail(value)
          ? ''
          : 'This is not a valid email address.'
      };
    else if (field === 'FIRST_NAME')
      members[index] = {
        ...member,
        firstName: value,
        firstNameError: value.length ? '' : 'Please fill out a first name.'
      };
    else
      members[index] = {
        ...member,
        lastName: value,
        lastNameError: value.length ? '' : 'Please fill out a last name.'
      };

    return { ...state, members };
  })
};

export default createContextStore<AddMemberModel>(addMemberModel, {
  disableImmer: true
});
