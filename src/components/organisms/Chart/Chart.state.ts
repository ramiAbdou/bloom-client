import { useReducer } from 'react';
import { createContainer } from 'react-tracked';

import {
  ChartAction,
  ChartData,
  ChartInitialState,
  ChartState,
  ChartType
} from './Chart.types';

const setData = (state: ChartState, data: ChartData[]) => {
  return { ...state, data };
};

const setTitle = (state: ChartState, title: string) => {
  return { ...state, title };
};

const setType = (state: ChartState, type: ChartType) => {
  return { ...state, type };
};

const chartReducer = (state: ChartState, action: ChartAction) => {
  switch (action.type) {
    case 'SET_DATA':
      return setData(state, action.data);

    case 'SET_TITLE':
      return setTitle(state, action.title);

    case 'SET_TYPE':
      return setType(state, action.chartType);

    default:
      return state;
  }
};

const useChartValue = ({ data, options, type }: ChartInitialState) => {
  const chartState: ChartState = {
    data: data ?? [],
    options: { ...options },
    title: null,
    type: type ?? ChartType.BAR
  };

  return useReducer(chartReducer, chartState);
};

export const {
  Provider: ChartProvider,
  useTracked: useChart,
  useTrackedState: useChartState,
  useUpdate: useChartDispatch
} = createContainer(useChartValue);
