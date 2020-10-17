/**
 * @fileoverview Store: Loader
 * @author Rami Abdou
 */

import { Action, action } from 'easy-peasy';

export type LoaderModel = {
  isLoading: boolean;
  hideLoader: Action<LoaderModel>;
  showLoader: Action<LoaderModel>;
};

export const loaderModel: LoaderModel = {
  hideLoader: action(() => ({ isLoading: false })),
  isLoading: false,
  showLoader: action(() => ({ isLoading: true }))
};
