import { Action } from 'easy-peasy';

export enum PaymentModalType {
  CHANGE_MEMBERSHIP = 'CHANGE_MEMBERSHIP',
  PAY_DUES = 'PAY_DUES',
  UPDATE_PAYMENT_METHOD = 'UPDATE_PAYMENT_METHOD'
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

export interface UpdateStripePaymentMethodIdArgs {
  paymentMethodId: string;
}

// ## PAYMENT STORE MODEL

export interface PaymentModel {
  changeAmount: number;
  changeProrationDate: number;
  selectedMemberTypeId: string;
  setChangeData: Action<
    PaymentModel,
    Pick<PaymentModel, 'changeAmount' | 'changeProrationDate'>
  >;
  type: PaymentModalType;
}
