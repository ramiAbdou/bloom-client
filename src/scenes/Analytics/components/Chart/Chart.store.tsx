import { Action, action, createContextStore } from 'easy-peasy';

import { IQuestion } from '@store/entities';

export type ChartData = { name: string; value: any };

type ChartModelInitArgs = {
  data: ChartData[];
  numResponses: number;
  question: IQuestion;
};

export type ChartModel = {
  data: ChartData[];
  init: Action<ChartModel, ChartModelInitArgs>;
  numResponses: number;
  question: IQuestion;
};

export default createContextStore<ChartModel>(
  {
    data: [],

    init: action(
      (state, { data, numResponses, question }: ChartModelInitArgs) => ({
        ...state,
        data,
        numResponses,
        question
      })
    ),

    numResponses: 0,

    question: null
  },
  { disableImmer: true }
);
