import { Action, action, createContextStore } from 'easy-peasy';

import { ChartModelInitArgs, ChartOptions, ChartType } from './Chart.types';

export interface ChartModel extends ChartModelInitArgs {
  options: ChartOptions;
  setData: Action<ChartModel, ChartModelInitArgs>;
  setQuestionId: Action<ChartModel, string>;
  setType: Action<ChartModel, ChartType>;
}

export const chartModel: ChartModel = {
  data: [],

  interval: null,

  options: null,

  questionId: null,

  setData: action((state, args: ChartModelInitArgs) => {
    return { ...state, ...args };
  }),

  setQuestionId: action((state, questionId: string) => {
    return {
      ...state,
      questionId
    };
  }),

  setType: action((state, type: ChartType) => {
    return { ...state, type };
  }),

  title: null,

  totalResponses: null,

  type: ChartType.BAR
};

export default createContextStore<ChartModel>(
  (runtimeModel) => {
    return { ...runtimeModel, options: runtimeModel.options };
  },
  { disableImmer: true }
);
