import React from 'react';

import Chart from '@components/Chart/Chart';
import PlaygroundHeader from './Header';
import Playground from './Playground.store';

const PlaygroundChart = () => {
  const questionId = Playground.useStoreState((store) => store.questionId);
  return <Chart questionId={questionId} />;
};

/**
 * Only state that is tracked here is the questionId of the question that is
 * currently being displayed.
 */
export default () => (
  <Playground.Provider>
    <div className="s-analytics-members-playground">
      <PlaygroundHeader />
      <PlaygroundChart />
    </div>
  </Playground.Provider>
);
