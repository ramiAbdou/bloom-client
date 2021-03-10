import { action, createContextStore } from 'easy-peasy';

import { PaymentModel } from './Payment.types';

export const paymentModel: PaymentModel = {
  changeAmount: null,
  changeProrationDate: null,
  selectedPlanId: null,

  setChangeData: action((state, args) => ({
    ...state,
    changeAmount: args?.changeAmount,
    changeProrationDate: args?.changeProrationDate
  })),

  type: 'PAY_DUES'
};

const PaymentStore = createContextStore<PaymentModel>(
  (runtimeModel: PaymentModel) => runtimeModel,
  { disableImmer: true }
);

export default PaymentStore;
