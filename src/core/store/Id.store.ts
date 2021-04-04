import { Action, action, createContextStore } from 'easy-peasy';

import { IdProps } from '@util/constants';

interface IdModel extends IdProps {
  setId?: Action<IdModel, string>;
}

const idModel: IdModel = {
  id: null,

  setId: action((state, id: string) => {
    return { ...state, id };
  })
};

const IdStore = createContextStore<IdModel>(
  (runtimeModel: IdModel) => {
    return { ...runtimeModel, ...idModel };
  },
  { disableImmer: true }
);

export default IdStore;
