export type PaymentModalType =
  | 'CHANGE_MEMBERSHIP'
  | 'PAY_DUES'
  | 'UPDATE_PAYMENT_METHOD';

export interface CreateLifetimePaymentArgs {
  memberPlanId: string;
}

export interface CreateSubscriptionArgs {
  memberPlanId: string;
  prorationDate?: number;
}

export interface GetChangePreviewArgs {
  memberPlanId: string;
}

export interface GetChangePreviewResult {
  amount: number;
  prorationDate: number;
}

export interface UpdatePaymentMethodArgs {
  paymentMethodId: string;
}
