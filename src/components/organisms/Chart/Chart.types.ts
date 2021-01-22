import { ShowProps } from '@constants';

export type ChartData = { name: string; value: number | string };

export interface ChartOptions {
  format?: 'MONEY';
}

export enum ChartType {
  BAR = 'BAR',
  PIE = 'PIE',
  TIME_SERIES = 'TIME_SERIES'
}

export interface ChartModelInitArgs extends ShowProps {
  data?: ChartData[];
  options?: ChartOptions;
  questionId?: string;
  interval?: number;
  totalResponses?: number;
  title?: string;
  type?: ChartType;
}
