import React from 'react';
import { Redirect } from 'react-router-dom';

import MainHeader from '@containers/Main/MainHeader';
import { useStoreState } from '@store/Store';

export default () => {
  const duesStatus = useStoreState(({ db }) => db.member?.duesStatus);
  const isUserActive = duesStatus === 'ACTIVE';

  if (!isUserActive) return <Redirect to="directory" />;

  return (
    <>
      <MainHeader title="Events" />
    </>
  );
};
