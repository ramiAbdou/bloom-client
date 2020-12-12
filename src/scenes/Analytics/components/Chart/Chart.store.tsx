import { Action, action, createContextStore } from 'easy-peasy';

import { IQuestion } from '@store/entities';

type ChartData = { name: string; value: any };

export type ChartModel = {
  data: ChartData[];
  question: IQuestion;
  setData: Action<ChartModel, ChartData[]>;
  setQuestion: Action<ChartModel, IQuestion>;
};

export default createContextStore<ChartModel>(
  {
    data: [],
    question: null,
    setData: action((state, data: ChartData[]) => ({ ...state, data })),
    setQuestion: action((state, question: IQuestion) => ({
      ...state,
      question
    }))
  },
  { disableImmer: true }
);
