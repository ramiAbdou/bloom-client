import { Action, action, createContextStore } from 'easy-peasy';

import { IdProps } from '@util/constants';

interface IdModel extends IdProps {
  setId?: Action<IdModel, string>;
}

const IdStore = createContextStore<IdModel>(
  (runtimeModel) => {
    return {
      ...runtimeModel,

      setId: action((state, id: string) => {
        return { ...state, id };
      })
    };
  },
  { disableImmer: true }
);

export default IdStore;
