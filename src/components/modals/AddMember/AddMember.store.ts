import { Action, action, createContextStore } from 'easy-peasy';

import { uuid } from '@util/util';

type AddMemberModel = {
  addRow: Action<AddMemberModel>;
  admin?: boolean;
  clearRows: Action<AddMemberModel>;
  deleteRow: Action<AddMemberModel, string>;
  rows: string[];
};

export const addMemberModel: AddMemberModel = {
  addRow: action((state) => ({ ...state, rows: [...state.rows, uuid()] })),
  admin: false,
  clearRows: action((state) => ({ ...state, rows: [uuid()] })),
  deleteRow: action((state, rowId: string) => ({
    ...state,
    rows: state.rows.filter((id: string) => id !== rowId)
  })),
  rows: [uuid()]
};

const AddMemberStore = createContextStore<AddMemberModel>(
  (runtimeModel) => runtimeModel,
  { disableImmer: true }
);

export default AddMemberStore;
