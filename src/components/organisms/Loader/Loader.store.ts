import { Action, action } from 'easy-peasy';

export type LoaderModel = {
  closeLoader: Action<LoaderModel>;
  isShowing: boolean;
  showLoader: Action<LoaderModel>;
};

const loaderModel: LoaderModel = {
  closeLoader: action((state) => ({ ...state, isShowing: false })),
  isShowing: false,
  showLoader: action((state) => ({ ...state, isShowing: true }))
};

export default loaderModel;
