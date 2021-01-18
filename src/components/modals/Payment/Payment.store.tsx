import { Action, action, createContextStore } from 'easy-peasy';

import { PaymentModalType } from './Payment.util';

export type PaymentModel = {
  clearOptions: Action<PaymentModel>;
  selectedTypeId: string;
  setSelectedTypeId: Action<PaymentModel, string>;
  type: PaymentModalType;
};

export const paymentModel: PaymentModel = {
  clearOptions: action((store) => ({
    ...store,
    screen: null,
    selectedTypeId: null
  })),

  selectedTypeId: null,

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
