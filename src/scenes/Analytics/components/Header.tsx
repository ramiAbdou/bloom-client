import React from 'react';
import { useHistory } from 'react-router-dom';

import MultiButton from '@components/Button/MultiButton';
import Spinner from '@components/Loader/Spinner';
import Loading from '@store/Loading.store';
import { takeFirst } from '@util/util';

const Navigation = () => {
  const { location, push } = useHistory();
  const { pathname } = location;

  const page = pathname.substring(pathname.lastIndexOf('/') + 1);

  const activeIndex = takeFirst([
    [page === 'members', 0],
    [page === 'dues', 1],
    [page === 'events', 2]
  ]);

  if (activeIndex === null) return null;

  return (
    <MultiButton
      activeIndex={activeIndex}
      options={[
        { onClick: () => push('members'), title: 'Members' },
        { onClick: () => push('dues'), title: 'Dues' },
        { onClick: () => push('events'), title: 'Events' }
      ]}
    />
  );
};

const HeaderText = () => {
  const loading = Loading.useStoreState((store) => store.loading);

  return (
    <div>
      <h1 className="s-home-header-title">Analytics</h1>
      {loading && <Spinner dark />}
    </div>
  );
};

export default () => {
  return (
    <div className="s-home-header s-analytics-header">
      <HeaderText />
      <Navigation />
    </div>
  );
};
