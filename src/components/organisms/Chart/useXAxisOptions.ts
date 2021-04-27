import day from 'dayjs';
import { XAxisProps } from 'recharts';

import { useChart } from './Chart.state';
import { ChartFormat, ChartType, ChartXAxisOptions } from './Chart.types';

const useXAxisOptions = (): Partial<XAxisProps> => {
  const [{ options, type }] = useChart();

  const format: ChartFormat = options?.format;
  const xAxis: ChartXAxisOptions = options?.xAxis;

  return {
    allowDuplicatedCategory: false,
    dataKey: 'name',
    interval: xAxis?.interval ?? 'preserveEnd',
    minTickGap: 24,
    padding: { left: 16, right: 16 },
    tickFormatter:
      xAxis?.tickFormatter ??
      ((label) => {
        if (type !== ChartType.TIME_SERIES || !day(label).isValid()) {
          return label;
        }

        return format === 'HOUR'
          ? day(label).format('MMM D, h A')
          : day(label).format('MMM D');
      }),
    tickSize: 8
  };
};

export default useXAxisOptions;
