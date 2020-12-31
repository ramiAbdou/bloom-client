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

export interface AddMemberData extends IdProps {
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
  deleteMember: Action<AddMemberModel, string>;
  getMember: Computed<AddMemberModel, (id: string) => AddMemberData, {}>;
  members: AddMemberData[];
  isShowingErrors: boolean;
  showErrors: Action<AddMemberModel>;
  toggleAdmin: Action<AddMemberModel, string>;
  updateMember: Action<AddMemberModel, UpdateMemberArgs>;
};

/**
 * Generates an empty member with no fields filled out. Used when adding
 * an empty member as wel as clearing members. Acts as initial state.
 */
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

/**
 * Returns true if one of the members has an error with the input.
 */
export const doesInputHaveError = (members: AddMemberData[]) =>
  !members.length ||
  members.some(
    ({ emailError, firstNameError, lastNameError }) =>
      emailError || firstNameError || lastNameError
  );

const addMemberModel: AddMemberModel = {
  addEmptyMember: action(({ members, ...state }) => ({
    ...state,
    isShowingErrors: false,
    members: [...members, generateEmptyMember()]
  })),

  clearMembers: action((state) => {
    return {
      ...state,
      isShowingErrors: false,
      members: [generateEmptyMember()]
    };
  }),

  deleteMember: action(({ members, ...state }, id: string) => {
    return {
      ...state,
      members: members.filter((member) => member.id !== id)
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

    if (field === 'EMAIL') {
      members[index] = {
        ...member,
        email: value,
        emailError: validator.isEmail(value)
          ? ''
          : 'This is not a valid email address.'
      };
    } else if (field === 'FIRST_NAME') {
      members[index] = {
        ...member,
        firstName: value,
        firstNameError: value.length ? '' : 'Please fill out a first name.'
      };
    } else {
      members[index] = {
        ...member,
        lastName: value,
        lastNameError: value.length ? '' : 'Please fill out a last name.'
      };
    }

    return { ...state, members };
  })
};

export default createContextStore<AddMemberModel>(addMemberModel, {
  disableImmer: true
});
