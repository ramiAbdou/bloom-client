import React from 'react';

import { useStoreState } from '@store/Store';
import AnalyticsSimple from '../Simple';

export default () => {
  const numMembers = useStoreState(({ db }) => db.community.members?.length);
  if (!numMembers) return null;

  return (
    <AnalyticsSimple
      label="Total Members"
      percentage="+8%"
      value={numMembers}
    />
  );
};
