import React from 'react';

import Loading from '@store/Loading.store';
import { useStoreState } from '@store/Store';
import AnalyticsSimple from '../Simple';

export default () => {
  const numMembers = useStoreState(({ db }) => db.community.members?.length);
  const loading = Loading.useStoreState((store) => store.loading);

  if (!numMembers || loading) return null;
  return (
    <AnalyticsSimple
      label="Total Members"
      percentage="+8%"
      value={numMembers}
    />
  );
};
