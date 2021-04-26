import { YAxisProps } from 'recharts';

import { useChartState } from './Chart.state';
import { ChartFormat, ChartState, ChartYAxisOptions } from './Chart.types';

const useYAxisOptions = (): Partial<YAxisProps> => {
  const { options }: ChartState = useChartState();

  const format: ChartFormat = options?.format;
  const yAxisOptions: ChartYAxisOptions = options?.yAxis;

  return {
    domain: yAxisOptions?.domain ?? [
      (dataMin: number) => Math.round(dataMin * 0.8),
      'auto'
    ],
    padding: { bottom: 16 },
    tickFormatter: (value) => (format === 'MONEY' ? `$${value}` : value),
    width: yAxisOptions?.width ?? 48
  };
};

export default useYAxisOptions;
