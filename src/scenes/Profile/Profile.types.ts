export interface MemberValueInput {
  questionId: string;
  value: string[];
}

export interface UpdateMemberValueArgs {
  items: MemberValueInput[];
}

export interface UpdateMemberArgs {
  bio?: string;
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
