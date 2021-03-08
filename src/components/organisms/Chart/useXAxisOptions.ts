import day from 'dayjs';
import { XAxisProps } from 'recharts';

import ChartStore from './Chart.store';
import { ChartType } from './Chart.types';

const useXAxisOptions = (): Partial<XAxisProps> => {
  const type = ChartStore.useStoreState((state) => state.type);
  const format = ChartStore.useStoreState(({ options }) => options?.format);
  const xAxis = ChartStore.useStoreState(({ options }) => options?.xAxis);

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
