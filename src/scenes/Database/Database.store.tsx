/**
 * @fileoverview Store: Database
 * @author Rami Abdou
 */

import { Action, action, createContextStore } from 'easy-peasy';

type DatabaseModel = {
  loading: boolean;
  setLoading: Action<DatabaseModel, boolean>;
};

export default createContextStore<DatabaseModel>(
  {
    loading: false,
    setLoading: action((state, loading) => ({ ...state, loading }))
  },
  { disableImmer: true }
);
