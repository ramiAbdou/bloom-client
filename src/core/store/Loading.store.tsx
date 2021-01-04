import { Action, action, createContextStore } from 'easy-peasy';

export type LoadingModel = {
  loading: boolean;
  setLoading: Action<LoadingModel, boolean>;
};

export const loadingModel: LoadingModel = {
  loading: null,
  setLoading: action((state, loading: boolean) => ({ ...state, loading }))
};

export default createContextStore<LoadingModel>(loadingModel, {
  disableImmer: true
});
