export interface ApplyForMembershipArgs {
  data: { questionId: string; value: any }[];
  email: string;
  memberPlanId?: string;
  paymentMethodId?: string;
  urlName: string;
}

export interface IsEmailTakenArgs {
  communityId: string;
  email: string;
}
