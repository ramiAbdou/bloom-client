import { Action, action, createContextStore } from 'easy-peasy';

export type IntegrationsModalType =
  | 'MAILCHIMP_FORM'
  | 'MAILCHIMP_DETAILS'
  | 'STRIPE_DETAILS'
  | 'ZAPIER_FLOW';

export type IntegrationsModel = {
  flow: IntegrationsModalType;
  setFlow: Action<IntegrationsModel, IntegrationsModalType>;
};

const model: IntegrationsModel = {
  flow: null,
  setFlow: action((state, flow) => ({ ...state, flow }))
};

export default createContextStore<IntegrationsModel>(model, {
  disableImmer: true
});
