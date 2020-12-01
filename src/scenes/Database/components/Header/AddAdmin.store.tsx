/**
 * @fileoverview Store: AddAdmin
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

interface AddAdminData extends IdProps {
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
  admins: AddAdminData[];
  clearMembers: Action<AddMemberModel>;
  getMember: Computed<AddMemberModel, (id: string) => AddAdminData, {}>;
  isShowingErrors: boolean;
  showErrors: Action<AddMemberModel>;
  updateMember: Action<AddMemberModel, UpdateMemberArgs>;
};

const generateEmptyMember = (): AddAdminData => ({
  email: '',
  emailError: 'This is not a valid email address.',
  firstName: '',
  firstNameError: 'Please fill out a first name.',
  id: uuid(),
  lastName: '',
  lastNameError: 'Please fill out a last name.'
});

const addMemberModel: AddMemberModel = {
  addEmptyMember: action(({ admins, ...state }) => ({
    ...state,
    admins: [...admins, generateEmptyMember()],
    isShowingErrors: false
  })),

  admins: [generateEmptyMember()],

  clearMembers: action((state) => {
    return {
      ...state,
      admins: [generateEmptyMember()],
      isShowingErrors: false
    };
  }),

  getMember: computed(({ admins }) => (id: string) =>
    admins.find((admin) => admin.id === id)
  ),

  isShowingErrors: false,

  showErrors: action((state) => ({ ...state, isShowingErrors: true })),

  updateMember: action(({ admins, ...state }, { field, id, value }) => {
    const index = admins.findIndex((element) => element.id === id);
    const member = admins[index];

    if (field === 'EMAIL')
      admins[index] = {
        ...member,
        email: value,
        emailError: validator.isEmail(value)
          ? ''
          : 'This is not a valid email address.'
      };
    else if (field === 'FIRST_NAME')
      admins[index] = {
        ...member,
        firstName: value,
        firstNameError: value.length ? '' : 'Please fill out a first name.'
      };
    else
      admins[index] = {
        ...member,
        lastName: value,
        lastNameError: value.length ? '' : 'Please fill out a last name.'
      };

    return { ...state, admins };
  })
};

export default createContextStore<AddMemberModel>(addMemberModel, {
  disableImmer: true
});
