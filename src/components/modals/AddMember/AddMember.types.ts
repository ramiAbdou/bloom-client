export type MemberAddedData = {
  email: string;
  isAdmin: boolean;
  firstName: string;
  lastName: string;
};

export type MembersAddedRecord = Record<string, MemberAddedData>;
