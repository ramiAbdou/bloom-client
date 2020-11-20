/**
 * @fileoverview Store: Integrations
 * @author Rami Abdou
 */

import { Action, action, createContextStore } from 'easy-peasy';

import { IIntegrations } from '@store/entities';

export type IntegrationsModal =
  | 'MAILCHIMP_DETAILS'
  | 'MAILCHIMP_FLOW'
  | 'STRIPE_DETAILS'
  | 'ZAPIER_FLOW'
  | 'ZOOM_DETAILS';

export type IntegrationsModel = {
  flow: IntegrationsModal;
  integrations: IIntegrations;
  setFlow: Action<IntegrationsModel, IntegrationsModal>;
};

const model: IntegrationsModel = {
  flow: null,
  integrations: null,
  setFlow: action((state, flow) => ({ ...state, flow }))
};

export default createContextStore<IntegrationsModel>(model, {
  disableImmer: true
});
