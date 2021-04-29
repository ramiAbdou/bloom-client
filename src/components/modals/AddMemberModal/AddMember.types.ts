export interface AddMemberInput {
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
}

export interface AddMemberState {
  rows: string[];
}

export type AddMemberAction =
  | { type: 'ADD_ROW' }
  | { type: 'CLEAR_ROWS' }
  | { type: 'DELETE_ROW'; rowId: string };
