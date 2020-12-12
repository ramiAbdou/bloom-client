import { Action, action, createContextStore } from 'easy-peasy';

export interface PlaygroundModel {
  setTitle: Action<PlaygroundModel, string>;
  title: string;
}

const model: PlaygroundModel = {
  setTitle: action((state, title: string) => ({ ...state, title })),
  title: ''
};

export default createContextStore<PlaygroundModel>(model, {
  disableImmer: true
});
