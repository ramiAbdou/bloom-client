import { ShowProps } from '@constants';

export type ChartData = { name: string; value: number | string };

export interface ChartOptions {
  format?: 'HOUR' | 'MONEY';
}

export enum ChartType {
  BAR = 'BAR',
  PIE = 'PIE',
  TIME_SERIES = 'TIME_SERIES'
}

export interface ChartModelInitArgs extends ShowProps {
  data?: ChartData[];
  interval?: number;
  options?: ChartOptions;
  questionId?: string;
  totalResponses?: number;
  title?: string;
  type?: ChartType;
}
