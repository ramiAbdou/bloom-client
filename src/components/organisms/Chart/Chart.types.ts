import { AxisDomain, AxisInterval, TickFormatterFunction } from 'recharts';

import { BaseProps } from '@constants';

export type ChartData = { name: string; value: number | string };

export type ChartFormat = 'HOUR' | 'MONEY';

export interface ChartXAxisOptions {
  interval?: AxisInterval;
  tickFormatter?: TickFormatterFunction;
}

export interface ChartYAxisOptions {
  domain?: [AxisDomain, AxisDomain];
  width?: number;
}

export interface ChartOptions {
  format?: ChartFormat;
  xAxis?: ChartXAxisOptions;
  yAxis?: ChartYAxisOptions;
}

export enum ChartType {
  BAR = 'BAR',
  PIE = 'PIE',
  TIME_SERIES = 'TIME_SERIES'
}

export interface ChartModelInitArgs extends BaseProps {
  data?: ChartData[];
  interval?: number;
  options?: ChartOptions;
  questionId?: string;
  totalResponses?: number;
  title?: string;
  type?: ChartType;
}
