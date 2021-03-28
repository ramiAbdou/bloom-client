import { Action, action, createContextStore } from 'easy-peasy';

type DatabaseModel = {
  loading: boolean;
  setLoading: Action<DatabaseModel, boolean>;
};

export default createContextStore<DatabaseModel>(
  {
    loading: true,
    setLoading: action((state, loading) => {
      return { ...state, loading };
    })
  },
  { disableImmer: true }
);
