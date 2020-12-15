import React from 'react';

import { useStoreState } from '@store/Store';
import AnalyticsSimple from '../../SimpleCard';
import Members from '../Members.store';

export default () => {
  const numMembers = useStoreState(({ db }) => db.community.members?.length);
  const totalGrowth = Members.useStoreState((store) => store.totalGrowth);
  if (!numMembers) return null;

  return (
    <AnalyticsSimple
      label="Total Members"
      percentage={totalGrowth}
      value={numMembers}
    />
  );
};
