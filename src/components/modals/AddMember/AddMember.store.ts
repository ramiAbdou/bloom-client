import { Action, action, createContextStore } from 'easy-peasy';
import { nanoid } from 'nanoid';

type AddMemberModel = {
  addRow: Action<AddMemberModel>;
  admin?: boolean;
  clearRows: Action<AddMemberModel>;
  deleteRow: Action<AddMemberModel, string>;
  rows: string[];
};

export const addMemberModel: AddMemberModel = {
  addRow: action((state) => ({ ...state, rows: [...state.rows, nanoid()] })),
  admin: false,
  clearRows: action((state) => ({ ...state, rows: [nanoid()] })),
  deleteRow: action((state, rowId: string) => ({
    ...state,
    rows: state.rows.filter((id: string) => id !== rowId)
  })),
  rows: [nanoid()]
};

const AddMemberStore = createContextStore<AddMemberModel>(
  (runtimeModel) => runtimeModel,
  { disableImmer: true }
);

export default AddMemberStore;
