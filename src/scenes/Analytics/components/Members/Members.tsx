import React from 'react';

import Playground from './Playground';
import AnalyticsSimpleActive from './SimpleActive';
import AnalyticsSimpleTotal from './SimpleTotal';

const AnalyticsSimpleList = () => (
  <div>
    <AnalyticsSimpleTotal />
    <AnalyticsSimpleActive />
  </div>
);

export default () => {
  return (
    <div>
      <AnalyticsSimpleList />
      <Playground />
    </div>
  );
};
