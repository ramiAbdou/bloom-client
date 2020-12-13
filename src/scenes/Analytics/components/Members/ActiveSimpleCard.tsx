import React from 'react';

import { useStoreState } from '@store/Store';
import AnalyticsSimple from '../SimpleCard';

export default () => {
  const numMembers = useStoreState(({ db }) => db.community.members?.length);
  if (!numMembers) return null;

  return (
    <AnalyticsSimple
      label="Active Users in Last 30 Days"
      percentage="+8%"
      value={115}
    />
  );
};
