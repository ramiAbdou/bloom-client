export interface GetUpcomingPaymentResult {
  amount: number;
  nextPaymentDate: string;
}

export interface UpdateMemberArgs {
  autoRenew?: boolean;
  bio?: boolean;
}
