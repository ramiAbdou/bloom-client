import { YAxisProps } from 'recharts';

import ChartStore from './Chart.store';

const useYAxisOptions = (): Partial<YAxisProps> => {
  const format = ChartStore.useStoreState(({ options }) => options?.format);
  const yOptions = ChartStore.useStoreState(({ options }) => options?.yAxis);

  return {
    domain: yOptions?.domain ?? [
      (dataMin: number) => Math.round(dataMin * 0.8),
      'auto'
    ],
    tickFormatter: (value) => (format === 'MONEY' ? `$${value / 100}` : value),
    width: yOptions?.width ?? 48
  };
};

export default useYAxisOptions;
