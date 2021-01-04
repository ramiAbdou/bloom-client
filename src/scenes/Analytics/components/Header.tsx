import MainHeader from 'core/templates/Main/Header';
import { NavigationOptionProps } from 'core/templates/Main/Navigation';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Loading from '@store/Loading.store';
import { takeFirst } from '@util/util';

export default () => {
  const loading = Loading.useStoreState((store) => store.loading);

  const { location, push } = useHistory();
  const { pathname } = location;

  const page = pathname.substring(pathname.lastIndexOf('/') + 1);

  const activeIndex = takeFirst([
    [page === 'members', 0],
    [page === 'dues', 1],
    [page === 'events', 2]
  ]);

  if (activeIndex === null) return null;

  const options: NavigationOptionProps[] = [
    { onClick: () => push('members'), title: 'Members' },
    { onClick: () => push('dues'), title: 'Dues' },
    { onClick: () => push('events'), title: 'Events' }
  ];

  return (
    <MainHeader
      activeIndex={activeIndex}
      className="s-analytics-header"
      loading={loading}
      options={options}
      title="Analytics"
    />
  );
};
