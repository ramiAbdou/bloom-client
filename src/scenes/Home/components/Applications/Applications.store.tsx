/**
 * @fileoverview Store: Applications
 * @author Rami Abdou
 */

import { createContextStore } from 'easy-peasy';

type ApplicationModel = {};

const applicationModel: ApplicationModel = {};

export default createContextStore<ApplicationModel>(applicationModel, {
  disableImmer: true
});
