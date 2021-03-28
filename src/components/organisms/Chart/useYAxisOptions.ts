import { YAxisProps } from 'recharts';

import ChartStore from './Chart.store';
import { ChartFormat } from './Chart.types';

const useYAxisOptions = (): Partial<YAxisProps> => {
  const format: ChartFormat = ChartStore.useStoreState(({ options }) => {
    return options?.format;
  });

  const yOptions = ChartStore.useStoreState(({ options }) => {
    return options?.yAxis;
  });

  return {
    domain: yOptions?.domain ?? [
      (dataMin: number) => {
        return Math.round(dataMin * 0.8);
      },
      'auto'
    ],
    padding: { bottom: 16 },
    tickFormatter: (value) => {
      return format === 'MONEY' ? `$${value}` : value;
    },
    width: yOptions?.width ?? 48
  };
};

export default useYAxisOptions;
