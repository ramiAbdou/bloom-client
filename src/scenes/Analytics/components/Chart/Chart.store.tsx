import { Action, action, createContextStore } from 'easy-peasy';

import { IQuestion } from '@store/entities';

export type ChartData = { name: string; value: any };
export type ChartModelInitArgs = { data: ChartData[]; numResponses?: number };
type ChartType = 'bar' | 'line' | 'pie';

export type ChartModel = {
  data: ChartData[];
  initData: Action<ChartModel, ChartModelInitArgs>;

  // Represents the number of responses that went into the captured data.
  numResponses: number;
  question: IQuestion;
  setQuestion: Action<ChartModel, IQuestion>;
  setType: Action<ChartModel, ChartType>;
  type: ChartType;
};

export const chartModel: ChartModel = {
  data: [],

  initData: action((state, { data, numResponses }: ChartModelInitArgs) => ({
    ...state,
    data,
    numResponses
  })),

  numResponses: 0,

  question: null,

  setQuestion: action((state, question: IQuestion) => ({
    ...state,
    question
  })),

  setType: action((state, type: ChartType) => ({ ...state, type })),

  type: 'bar'
};

export default createContextStore<ChartModel>(chartModel, {
  disableImmer: true
});
