import React from 'react';

import PlaygroundChart from './Chart';
import PlaygroundHeader from './Header';
import Playground from './Playground.store';

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
