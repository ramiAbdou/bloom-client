export type PaymentModalType =
  | 'CHANGE_MEMBERSHIP'
  | 'PAY_DUES'
  | 'UPDATE_PAYMENT_METHOD';

export interface CreateLifetimePaymentArgs {
  memberTypeId: string;
}

export interface CreateSubscriptionArgs {
  memberTypeId: string;
  prorationDate?: number;
}

export interface GetChangePreviewArgs {
  memberTypeId: string;
}

export interface GetChangePreviewResult {
  amount: number;
  prorationDate: number;
}

export interface UpdatePaymentMethodArgs {
  paymentMethodId: string;
}
