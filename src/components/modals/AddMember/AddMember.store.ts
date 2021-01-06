import { Action, action, createContextStore } from 'easy-peasy';

import { uuid } from '@util/util';

type AddMemberModal = {
  addRow: Action<AddMemberModal>;
  clearRows: Action<AddMemberModal>;
  deleteRow: Action<AddMemberModal, string>;
  rows: string[];
};

export const model: AddMemberModal = {
  addRow: action((state) => ({ ...state, rows: [...state.rows, uuid()] })),

  clearRows: action((state) => ({ ...state, rows: [uuid()] })),

  deleteRow: action((state, rowId: string) => ({
    ...state,
    rows: state.rows.filter((id: string) => id !== rowId)
  })),

  rows: [uuid()]
};

const AddMemberStore = createContextStore<AddMemberModal>(model, {
  disableImmer: true
});

export default AddMemberStore;
