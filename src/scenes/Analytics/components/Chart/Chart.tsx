import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import sw from 'stopword';

import HeaderTag from '@components/Elements/HeaderTag';
import Loading from '@store/Loading.store';
import { useStoreState } from '@store/Store';
import Chart, { ChartData, ChartModel } from './Chart.store';
import useShortTextData from './useShortTextData';

const ChartTitle = () => {
  const loading = Loading.useStoreState((store) => store.loading);
  const numResponses = Chart.useStoreState((store) => store.numResponses);
  const title = Chart.useStoreState((store) => store.question?.title);

  return (
    <div>
      <h4>{title}</h4>
      {!loading && <HeaderTag value={`${numResponses} Responses`} />}
    </div>
  );
};

const ChartTooltip = ({ active, label }) => {
  const data = Chart.useStoreState((store) => store.data);
  const numResponses = Chart.useStoreState((store) => store.numResponses);

  if (!active || !label) return null;

  const { value } = data.find(({ name }) => name === label);
  const percentageOfTotal = ((value / numResponses) * 100).toFixed(2);

  return (
    <div className="s-analytics-chart-tooltip">
      <p>{label}</p>
      <p>
        {value} ({percentageOfTotal}%)
      </p>
    </div>
  );
};

const ChartGraphic = () => {
  const color = useStoreState(({ db }) => db.community.primaryColor);
  const data = Chart.useStoreState((store) => store.data);

  if (!data.length) return null;

  // Allows the chart to be large/not squish and is scrollable.
  const minWidth = data.length * 24;

  return (
    <div className="s-analytics-chart-graphic">
      <ResponsiveContainer height={360} minWidth={minWidth}>
        <BarChart
          barSize={24}
          data={data}
          margin={{ bottom: 0, left: 0, right: 0, top: 0 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            allowDuplicatedCategory={false}
            dataKey="name"
            minTickGap={16}
            tickSize={8}
          />
          <YAxis />

          <Tooltip
            content={(props: any) => <ChartTooltip {...props} />}
            wrapperStyle={{ visibility: 'visible' }}
          />
          <Bar dataKey="value" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const useWords = (questionId: string): [ChartData[], number] => {
  const result: [ChartData[], number] = useStoreState(({ db }) => {
    const record: Record<string, number> = {};
    const { byId: byMemberId } = db.entities.members;
    const { members } = db.community;

    if (!members?.length || !questionId) return [];

    let numMembers = 0;

    members.forEach((memberId: string) => {
      const { value } =
        byMemberId[memberId].allData?.find(
          (data) => data.questionId === questionId
        ) ?? {};

      if (!value) return;

      const wordArray: string[] = sw.removeStopwords(value.trim().split(' '));

      wordArray.forEach((word: string) => {
        if (record[word]) record[word]++;
        else record[word] = 1;
      });

      numMembers++;
    });

    return [
      Object.entries(record)
        .map(([word, occurences]) => ({ name: word, value: occurences }))
        .sort((a, b) => (a.value < b.value ? 1 : -1))
        .slice(0, 100),
      numMembers
    ];
  }, deepequal);

  return result;
};

const FetchQuestionData = () => {
  const questionId = Chart.useStoreState((store) => store.question?.id);
  const initData = Chart.useStoreActions((store) => store.initData);
  const [data, numResponses] = useShortTextData(questionId);

  useEffect(() => {
    if (data) initData({ data, numResponses });
  }, [data, numResponses]);

  return null;
};

const FetchLongTextData = () => {
  const questionId = Chart.useStoreState((store) => store.question?.id);
  const initData = Chart.useStoreActions((store) => store.initData);
  const [data, numResponses] = useWords(questionId);

  useEffect(() => {
    if (data) initData({ data, numResponses });
  }, [data, numResponses]);

  return null;
};

const ChartContent = (model: Pick<ChartModel, 'question'>) => {
  const type = Chart.useStoreState((store) => store.question?.type);
  const setQuestion = Chart.useStoreActions((store) => store.setQuestion);

  useEffect(() => {
    const { question } = model ?? {};
    if (question?.id) setQuestion(question);
  }, [model]);

  return (
    <div className="s-analytics-chart">
      <ChartTitle />
      {type === 'LONG_TEXT' && <FetchLongTextData />}
      {type !== 'LONG_TEXT' && <FetchQuestionData />}
      <ChartGraphic />
    </div>
  );
};

export default (
  model: Pick<ChartModel, 'data' | 'question' | 'numResponses'>
) => (
  <Chart.Provider>
    <ChartContent {...model} />
  </Chart.Provider>
);
