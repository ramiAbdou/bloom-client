/**
 * @fileoverview Store: Integrations
 * @author Rami Abdou
 */

import { Action, action, createContextStore } from 'easy-peasy';

export type IntegrationsModal =
  | 'MAILCHIMP_DETAILS'
  | 'MAILCHIMP_FLOW'
  | 'STRIPE_FLOW'
  | 'ZAPIER_FLOW'
  | 'ZOOM_FLOW';

export type IntegrationsModel = {
  flow: IntegrationsModal;
  setFlow: Action<IntegrationsModel, IntegrationsModal>;
};

const model: IntegrationsModel = {
  flow: null,
  setFlow: action((state, flow) => ({ ...state, flow }))
};

export default createContextStore<IntegrationsModel>(model, {
  disableImmer: true
});
