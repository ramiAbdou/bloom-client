/**
 * @fileoverview Store: Integrations
 * @author Rami Abdou
 */

import { Action, action, createContextStore } from 'easy-peasy';

export type IntegrationsFlow = 'MAILCHIMP' | 'STRIPE' | 'ZAPIER' | 'ZOOM';

export type IntegrationsModel = {
  flow: IntegrationsFlow;
  setFlow: Action<IntegrationsModel, IntegrationsFlow>;
};

const model: IntegrationsModel = {
  flow: null,
  setFlow: action((state, flow) => {
    console.log('setFlow', flow);
    return { ...state, flow };
  })
};

export default createContextStore<IntegrationsModel>(model, {
  disableImmer: true
});
