import { Action, action, createContextStore } from 'easy-peasy';

export type IntegrationsModal =
  | 'MAILCHIMP_FLOW'
  | 'MAILCHIMP_DETAILS'
  | 'STRIPE_DETAILS'
  | 'ZAPIER_FLOW';

export type IntegrationsModel = {
  flow: IntegrationsModal;
  setFlow: Action<IntegrationsModel, IntegrationsModal>;
};

const model: IntegrationsModel = {
  flow: null,
  setFlow: action((state, flow) => ({ ...state, flow }))
};

export default createContextStore<IntegrationsModel>(model);
