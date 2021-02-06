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
  selectedTypeId: string;
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
    selectedTypeId: null
  })),

  selectedTypeId: null,

  setChangeData: action((state, args) => ({
    ...state,
    changeAmount: args?.changeAmount,
    changeProrationDate: args?.changeProrationDate
  })),

  setSelectedTypeId: action((state, selectedTypeId: string) => ({
    ...state,
    selectedTypeId
  })),

  type: 'PAY_DUES'
};

const PaymentStore = createContextStore<PaymentModel>(
  (runtimeModel: PaymentModel) => runtimeModel,
  { disableImmer: true }
);

export default PaymentStore;
