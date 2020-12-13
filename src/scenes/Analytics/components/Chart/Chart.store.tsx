import { Action, action, createContextStore } from 'easy-peasy';

import { IQuestion } from '@store/entities';

export type ChartData = { name: string; value: any };

type ChartModelInitArgs = { data: ChartData[]; numResponses: number };

export type ChartModel = {
  data: ChartData[];
  initData: Action<ChartModel, ChartModelInitArgs>;
  numResponses: number;
  question: IQuestion;
  setQuestion: Action<ChartModel, IQuestion>;
};

export default createContextStore<ChartModel>(
  {
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
    }))
  },
  { disableImmer: true }
);
