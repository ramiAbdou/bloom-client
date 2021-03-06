export interface AddMemberInput {
  email: string;
  firstName: string;
  isAdmin: boolean;
  lastName: string;
}

export interface AddMembersArgs {
  members: AddMemberInput[];
}
