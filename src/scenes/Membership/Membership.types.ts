export interface GetUpcomingPaymentResult {
  amount: number;
  nextPaymentDate: string;
}

export interface UpdateMemberArgs {
  bio?: boolean;
}
