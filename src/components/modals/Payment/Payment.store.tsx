import { createContextStore } from 'easy-peasy';

export type PaymentModel = {
  selectedTypeId: string;
  type: 'CHANGE_PLAN' | 'PAY_DUES' | 'UPDATE_PAYMENT_METHOD';
};

export const paymentModel: PaymentModel = {
  selectedTypeId: null,
  type: 'PAY_DUES'
};

const PaymentStore = createContextStore<PaymentModel>(
  (runtimeModel: PaymentModel) => runtimeModel,
  { disableImmer: true }
);

export default PaymentStore;
