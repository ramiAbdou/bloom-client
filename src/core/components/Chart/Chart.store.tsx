import { Action, action, createContextStore } from 'easy-peasy';

export type ChartData = { name: string; value: number };
export enum ChartType {
  BAR = 'BAR',
  PIE = 'PIE',
  TIME_SERIES = 'TIME_SERIES'
}

export type ChartModelInitArgs = {
  data: ChartData[];
  questionId?: string;
  totalResponses?: number;
  title?: string;
  type?: ChartType;
};

export interface ChartModel extends ChartModelInitArgs {
  setData: Action<ChartModel, ChartModelInitArgs>;
  setQuestionId: Action<ChartModel, string>;
  setType: Action<ChartModel, ChartType>;
}

export const chartModel: ChartModel = {
  data: [],

  questionId: null,

  setData: action((state, args: ChartModelInitArgs) => ({ ...state, ...args })),

  setQuestionId: action((state, questionId: string) => ({
    ...state,
    questionId
  })),

  setType: action((state, type: ChartType) => ({ ...state, type })),

  title: null,

  totalResponses: 0,

  type: ChartType.BAR
};

export default createContextStore<ChartModel>(chartModel, {
  disableImmer: true
});
