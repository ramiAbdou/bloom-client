export type ChartData = { name: string; value: number | string };

export interface ChartOptions {
  format?: 'MONEY';
}

export enum ChartType {
  BAR = 'BAR',
  PIE = 'PIE',
  TIME_SERIES = 'TIME_SERIES'
}

export type ChartModelInitArgs = {
  data?: ChartData[];
  options?: ChartOptions;
  questionId?: string;
  interval?: number;
  totalResponses?: number;
  title?: string;
  type?: ChartType;
};
