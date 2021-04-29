import { Action, action, createContextStore } from 'easy-peasy';
import { nanoid } from 'nanoid';

export interface AddMemberModel {
  addRow: Action<AddMemberModel>;
  clearRows: Action<AddMemberModel>;
  deleteRow: Action<AddMemberModel, string>;
  rows: string[];
}

export const addMemberModel: AddMemberModel = {
  addRow: action((state) => {
    return { ...state, rows: [...state.rows, nanoid()] };
  }),

  clearRows: action((state) => {
    return { ...state, rows: [nanoid()] };
  }),

  deleteRow: action((state, rowId: string) => {
    return {
      ...state,
      rows: state.rows.filter((id: string) => id !== rowId)
    };
  }),

  rows: [nanoid()]
};

const AddMemberStore = createContextStore<AddMemberModel>(
  (runtimeModel) => runtimeModel,
  { disableImmer: true }
);

export default AddMemberStore;
