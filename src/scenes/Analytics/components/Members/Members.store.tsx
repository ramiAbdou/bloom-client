import { Action, action, createContextStore } from 'easy-peasy';

type TimeSeriesData = { name: string; value: number };
type MembersAnalyticsInitArgs = Pick<
  MembersAnalyticsModel,
  'totalChartData' | 'totalGrowth'
>;

type MembersAnalyticsModel = {
  init: Action<MembersAnalyticsModel, MembersAnalyticsInitArgs>;
  totalChartData: TimeSeriesData[];
  totalGrowth: number;
};

export default createContextStore<MembersAnalyticsModel>(
  {
    init: action((state, data: MembersAnalyticsInitArgs) => ({
      ...state,
      ...data
    })),
    totalChartData: [],
    totalGrowth: 0
  },
  { disableImmer: true }
);
