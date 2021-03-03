interface MemberDataInput {
  questionId: string;
  value: string[];
}

export interface UpdateMemberDataArgs {
  items: MemberDataInput[];
}

export interface UpdateMemberArgs {
  bio?: boolean;
}

export interface UpdateUserArgs {
  firstName?: string;
  lastName?: string;
  pictureUrl?: string;
}

export interface UpdateUserSocialsArgs {
  clubhouseUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedInUrl?: string;
  twitterUrl?: string;
}
