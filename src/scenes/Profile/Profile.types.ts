interface MemberDataInput {
  questionId: string;
  value: string[];
}

export interface UpdateMemberDataArgs {
  items: MemberDataInput[];
}

export interface UpdateMemberArgs {
  autoRenew?: boolean;
  bio?: boolean;
}

export interface UpdateUserArgs {
  firstName?: string;
  lastName?: string;
  pictureUrl?: string;
}

export interface UpdateUserSocialsArgs {
  facebookUrl?: string;
  instagramUrl?: string;
  linkedInUrl?: string;
  twitterUrl?: string;
}
