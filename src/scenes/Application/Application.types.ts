export interface ApplyForMembershipArgs {
  data: { questionId: string; value: unknown }[];
  email: string;
  memberPlanId?: string;
  paymentMethodId?: string;
  urlName: string;
}

export interface IsEmailTakenArgs {
  communityId: string;
  email: string;
}
