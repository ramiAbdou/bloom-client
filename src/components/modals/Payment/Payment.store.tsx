import { Action, action, createContextStore } from 'easy-peasy';

import { PaymentModalType } from './Payment.types';

interface SetChangeDataArgs {
  changeAmount: number;
  changeProrationDate: number;
}

export type PaymentModel = {
  changeAmount: number;
  changeProrationDate: number;
  clear: Action<PaymentModel>;
  selectedPlanId: string;
  setChangeData: Action<PaymentModel, SetChangeDataArgs>;
  setSelectedTypeId: Action<PaymentModel, string>;
  type: PaymentModalType;
};

export const paymentModel: PaymentModel = {
  changeAmount: null,

  changeProrationDate: null,

  clear: action((state) => ({
    ...state,
    changeAmount: null,
    changeProrationDate: null,
    screen: null,
    selectedPlanId: null
  })),

  selectedPlanId: null,

  setChangeData: action((state, args) => ({
    ...state,
    changeAmount: args?.changeAmount,
    changeProrationDate: args?.changeProrationDate
  })),

  setSelectedTypeId: action((state, selectedPlanId: string) => ({
    ...state,
    selectedPlanId
  })),

  type: 'PAY_DUES'
};

const PaymentStore = createContextStore<PaymentModel>(
  (runtimeModel: PaymentModel) => runtimeModel,
  { disableImmer: true }
);

export default PaymentStore;
