import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';

import { useStoreState } from '@store/Store';
import BarChart from '../../Chart/Bar';
import Chart from '../../Chart/Chart.store';
import FormatChartData from '../../Chart/FormatData';
import FormatLongChartData from '../../Chart/FormatLongData';
import PieChart from '../../Chart/Pie';
import Playground from './Playground.store';

export default () => {
  const questionId = Playground.useStoreState((store) => store.questionId);
  const questionType = Chart.useStoreState((store) => store.question?.type);
  const chartType = Chart.useStoreState((store) => store.type);
  const setQuestion = Chart.useStoreActions((store) => store.setQuestion);
  const setType = Chart.useStoreActions((store) => store.setType);

  const question = useStoreState(
    ({ db }) => db.entities.questions.byId[questionId],
    deepequal
  );

  useEffect(() => {
    if (question?.id) setQuestion(question);
  }, [question]);

  useEffect(() => {
    if (questionType === 'LONG_TEXT' && chartType !== 'bar') setType('bar');
  }, [questionType]);

  if (!question?.id) return null;

  return (
    <>
      {questionType === 'LONG_TEXT' && <FormatLongChartData />}
      {questionType !== 'LONG_TEXT' && <FormatChartData />}
      {chartType === 'bar' && <BarChart />}
      {chartType === 'pie' && <PieChart />}
    </>
  );
};
