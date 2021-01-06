import { Action, action, createContextStore } from 'easy-peasy';

export type LoadingModel = {
  loading: boolean;
  setLoading: Action<LoadingModel, boolean>;
};

export const loadingModel: LoadingModel = {
  loading: null,
  setLoading: action((state, loading: boolean) => ({ ...state, loading }))
};

const LoadingStore = createContextStore<LoadingModel>(
  (runtimeModel) => runtimeModel ?? loadingModel,
  { disableImmer: true }
);

export default LoadingStore;
