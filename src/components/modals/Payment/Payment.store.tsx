import { action, createContextStore } from 'easy-peasy';

import { PaymentModalType, PaymentModel } from './Payment.types';

export const paymentModel: PaymentModel = {
  changeAmount: null,
  changeProrationDate: null,
  selectedMemberTypeId: null,

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
  (runtimeModel: PaymentModel) => runtimeModel,
  { disableImmer: true }
);

export default PaymentStore;
