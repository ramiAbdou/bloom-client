import React from 'react';

import { useStoreState } from '@store/Store';
import Chart from '../../Chart/Chart';
import Playground from './Playground.store';

export default () => {
  const a = useStoreState(({ db }) => {
    return db.community;
  });

  const title = Playground.useStoreState((store) => store.title);

  return <Chart data={[]} title={title} />;
};
