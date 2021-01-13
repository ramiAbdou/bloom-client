import { Action, action, createContextStore } from 'easy-peasy';

export interface PlaygroundModel {
  questionId: string;
  setQuestionId: Action<PlaygroundModel, string>;
}

const model: PlaygroundModel = {
  questionId: null,
  setQuestionId: action((state, questionId: string) => ({
    ...state,
    questionId
  }))
};

export default createContextStore<PlaygroundModel>(model, {
  disableImmer: true
});
