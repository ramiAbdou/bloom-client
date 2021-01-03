import React from 'react';
import { useHistory } from 'react-router-dom';

import MultiButton from '@components/Button/Multi';
import MainHeader from '@components/Main/Header';
import { takeFirst } from '@util/util';

const HeaderNavigation = () => {
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

export default () => (
  <MainHeader className="s-analytics-header" title="Analytics">
    <HeaderNavigation />
  </MainHeader>
);
