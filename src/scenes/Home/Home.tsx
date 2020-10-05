import React from 'react';

import { useStoreState } from '@store/Store';

export default () => {
  const firstName = useStoreState((store) => store.user.firstName);
  return <div>First Name: {firstName} </div>;
};
