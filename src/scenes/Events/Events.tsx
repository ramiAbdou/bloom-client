import React from 'react';
import { Redirect } from 'react-router-dom';

import { useStoreState } from '@store/Store';
import MainHeader from '@containers/Main/Header';

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
