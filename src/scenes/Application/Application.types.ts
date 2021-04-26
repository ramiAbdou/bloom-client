export interface ApplyForMembershipArgs {
  data: { questionId: string; value: any }[];
  email: string;
  memberTypeId?: string;
  paymentMethodId?: string;
  urlName: string;
}
