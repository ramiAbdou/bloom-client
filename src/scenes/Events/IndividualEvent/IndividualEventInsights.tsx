import React from 'react';

import { useStoreState } from '@store/Store';

const IndividualEventInsights: React.FC = () => {
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);

  if (!isAdmin) return null;

  return <div />;
};

export default IndividualEventInsights;
