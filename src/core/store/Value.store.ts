import { Action, action, createContextStore } from 'easy-peasy';

interface ValueModel<T = string> {
  value: T;
  setValue?: Action<ValueModel<T>, string>;
}

const ValueStore = createContextStore<ValueModel>(
  (runtimeModel) => {
    return {
      ...runtimeModel,

      setValue: action((state, value) => {
        return { ...state, value };
      })
    };
  },
  { disableImmer: true }
);

export default ValueStore;
