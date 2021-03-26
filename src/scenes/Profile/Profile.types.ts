export interface MemberValueInput {
  questionId: string;
  value: string[];
}

export interface UpdateMemberValueArgs {
  items: MemberValueInput[];
}

export interface UpdateMemberArgs {
  bio?: boolean;
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
