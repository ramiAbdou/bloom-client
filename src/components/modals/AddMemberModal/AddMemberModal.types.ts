export interface AddMemberState {
  rows: string[];
}

export type AddMemberAction =
  | { type: 'ADD_ROW' }
  | { type: 'CLEAR_ROWS' }
  | { type: 'DELETE_ROW'; rowId: string };
