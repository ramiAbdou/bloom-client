import { nanoid } from 'nanoid';
import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import { AddMemberAction, AddMemberState } from './AddMember.types';

const addRow = (state: AddMemberState): AddMemberState => {
  return { ...state, rows: [...state.rows, nanoid()] };
};

const clearRows = (state: AddMemberState): AddMemberState => {
  return { ...state, rows: [nanoid()] };
};

const deleteRow = (state: AddMemberState, rowId: string): AddMemberState => {
  return { ...state, rows: state.rows.filter((id: string) => id !== rowId) };
};

const addMemberReducer = (
  state: AddMemberState,
  action: AddMemberAction
): AddMemberState => {
  switch (action.type) {
    case 'ADD_ROW':
      return addRow(state);

    case 'CLEAR_ROWS':
      return clearRows(state);

    case 'DELETE_ROW':
      return deleteRow(state, action.rowId);

    default:
      return state;
  }
};

const useAddMemberValue = () => {
  const initialState: AddMemberState = { rows: [nanoid()] };

  return useReducer(addMemberReducer, initialState);
};

export const {
  Provider: AddMemberProvider,
  useTracked: useAddMember,
  useSelector: useAddMemberSelector
} = createContainer(useAddMemberValue);
