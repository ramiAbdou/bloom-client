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

  clear: action((store) => ({
    ...store,
    changeAmount: null,
    changeProrationDate: null,
    screen: null,
    selectedTypeId: null
  })),

  selectedTypeId: null,

  setChangeData: action((store, args) => ({
    ...store,
    changeAmount: args?.changeAmount,
    changeProrationDate: args?.changeProrationDate
  })),

  setSelectedTypeId: action((store, selectedTypeId: string) => ({
    ...store,
    selectedTypeId
  })),

  type: 'PAY_DUES'
};

const PaymentStore = createContextStore<PaymentModel>(
  (runtimeModel: PaymentModel) => runtimeModel,
  { disableImmer: true }
);

export default PaymentStore;
