import { Action, action, createContextStore } from 'easy-peasy';

type ChartData = { name: string; value: any };
export type ChartModel = {
  data: ChartData[];
  setData: Action<ChartModel, ChartData[]>;
  setTitle: Action<ChartModel, string>;
  title: string;
};

export default createContextStore<ChartModel>(
  {
    data: [],
    setData: action((state, data: ChartData[]) => ({ ...state, data })),
    setTitle: action((state, title: string) => ({ ...state, title })),
    title: ''
  },
  { disableImmer: true }
);
