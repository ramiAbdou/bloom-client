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

export interface AddAdminData extends IdProps {
  email: string;
  emailError: string;
  firstName: string;
  firstNameError: string;
  lastName: string;
  lastNameError: string;
}

type UpdateAdminArgs = {
  field: 'EMAIL' | 'FIRST_NAME' | 'LAST_NAME';
  id: string;
  value: string;
};

export type AddAdminModel = {
  addEmptyMember: Action<AddAdminModel>;
  admins: AddAdminData[];
  clearMembers: Action<AddAdminModel>;
  getMember: Computed<AddAdminModel, (id: string) => AddAdminData, {}>;
  isShowingErrors: boolean;
  showErrors: Action<AddAdminModel>;
  updateMember: Action<AddAdminModel, UpdateAdminArgs>;
};

/**
 * Generates an empty admin with no fields filled out. Used when adding
 * an empty admin as well as clearing admins. Acts as initial state.
 */
const generateEmptyAdmin = (): AddAdminData => ({
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
export const doesInputHaveError = (admins: AddAdminData[]) =>
  admins.some(
    ({ emailError, firstNameError, lastNameError }) =>
      emailError || firstNameError || lastNameError
  );

const addAdminModel: AddAdminModel = {
  addEmptyMember: action(({ admins, ...state }) => ({
    ...state,
    admins: [...admins, generateEmptyAdmin()],
    isShowingErrors: false
  })),

  admins: [generateEmptyAdmin()],

  clearMembers: action((state) => {
    return {
      ...state,
      admins: [generateEmptyAdmin()],
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

    if (field === 'EMAIL') {
      admins[index] = {
        ...member,
        email: value,
        emailError: validator.isEmail(value)
          ? ''
          : 'This is not a valid email address.'
      };
    } else if (field === 'FIRST_NAME') {
      admins[index] = {
        ...member,
        firstName: value,
        firstNameError: value.length ? '' : 'Please fill out a first name.'
      };
    } else {
      admins[index] = {
        ...member,
        lastName: value,
        lastNameError: value.length ? '' : 'Please fill out a last name.'
      };
    }

    return { ...state, admins };
  })
};

export default createContextStore<AddAdminModel>(addAdminModel);
