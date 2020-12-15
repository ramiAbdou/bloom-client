import { Action, action, createContextStore } from 'easy-peasy';

type TimeSeriesData = { name: string; value: number };
type MembersAnalyticsInitArgs = Omit<MembersAnalyticsModel, 'init'>;

type MembersAnalyticsModel = {
  activeChartData: TimeSeriesData[];
  activeGrowth: number;
  init: Action<MembersAnalyticsModel, MembersAnalyticsInitArgs>;
  totalChartData: TimeSeriesData[];
  totalGrowth: number;
};

export default createContextStore<MembersAnalyticsModel>(
  {
    activeChartData: [],
    activeGrowth: 0,
    init: action((state, data: MembersAnalyticsInitArgs) => ({
      ...state,
      ...data
    })),
    totalChartData: [],
    totalGrowth: 0
  },
  { disableImmer: true }
);
