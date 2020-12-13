import React from 'react';

import PlaygroundChart from './Chart';
import PlaygroundHeader from './Header';
import Playground from './Playground.store';

export default () => (
  <Playground.Provider>
    <div className="s-analytics-members-playground">
      <PlaygroundHeader />
      <PlaygroundChart />
    </div>
  </Playground.Provider>
);
