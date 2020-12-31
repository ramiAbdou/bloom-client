import { Action, action, createContextStore } from 'easy-peasy';

type TimeSeriesData = { name: string; value: number };

type ActiveMembersAnalyticsArgs = Pick<
  MembersAnalyticsModel,
  'activeChartData' | 'activeGrowth'
>;

type TotalMembersAnalyticsArgs = Pick<
  MembersAnalyticsModel,
  'totalChartData' | 'totalGrowth'
>;

type MembersAnalyticsModel = {
  activeChartData: TimeSeriesData[];
  activeGrowth: number;
  initActive: Action<MembersAnalyticsModel, ActiveMembersAnalyticsArgs>;
  initTotal: Action<MembersAnalyticsModel, TotalMembersAnalyticsArgs>;
  totalChartData: TimeSeriesData[];
  totalGrowth: number;
};

export default createContextStore<MembersAnalyticsModel>({
  activeChartData: [],

  activeGrowth: null,

  initActive: action((state, data: ActiveMembersAnalyticsArgs) => ({
    ...state,
    ...data
  })),

  initTotal: action((state, data: TotalMembersAnalyticsArgs) => ({
    ...state,
    ...data
  })),

  totalChartData: [],

  totalGrowth: null
});
