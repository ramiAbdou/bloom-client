import { Action, action } from 'easy-peasy';

export type LoadingModel = {
  loading: boolean;
  setLoading: Action<LoadingModel, boolean>;
};

export const loadingModel: LoadingModel = {
  loading: false,
  setLoading: action((state, loading: boolean) => ({ ...state, loading }))
};
