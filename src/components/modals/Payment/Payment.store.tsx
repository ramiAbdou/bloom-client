import { action, createContextStore } from 'easy-peasy';

import { PaymentModalType, PaymentModel } from './Payment.types';

export const paymentModel: PaymentModel = {
  changeAmount: null,
  changeProrationDate: null,
  selectedPlanId: null,

  setChangeData: action((state, args) => {
    return {
      ...state,
      changeAmount: args?.changeAmount,
      changeProrationDate: args?.changeProrationDate
    };
  }),

  type: PaymentModalType.PAY_DUES
};

const PaymentStore = createContextStore<PaymentModel>(
  (runtimeModel: PaymentModel) => {
    return runtimeModel;
  },
  { disableImmer: true }
);

export default PaymentStore;
