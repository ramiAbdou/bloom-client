/**
 * @fileoverview Store: Loader

 */

import { Action, action } from 'easy-peasy';

export type LoaderModel = {
  loading: boolean;
  hideLoader: Action<LoaderModel>;
  showLoader: Action<LoaderModel>;
};

export const loaderModel: LoaderModel = {
  hideLoader: action(() => ({ loading: false })),
  loading: false,
  showLoader: action(() => ({ loading: true }))
};
