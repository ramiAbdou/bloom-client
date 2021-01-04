import MainHeader from 'core/templates/Main/Header';
import { NavigationOptionProps } from 'core/templates/Main/Navigation';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Loading from '@store/Loading.store';

const AnalyticsHeader = () => {
  const loading = Loading.useStoreState((store) => store.loading);
  const { push } = useHistory();

  const options: NavigationOptionProps[] = [
    { onClick: () => push('members'), pathname: 'members', title: 'Members' },
    { onClick: () => push('dues'), pathname: 'dues', title: 'Dues' },
    { onClick: () => push('events'), pathname: 'events', title: 'Events' }
  ];

  return (
    <MainHeader
      className="s-analytics-header"
      loading={loading}
      options={options}
      title="Analytics"
    />
  );
};

export default AnalyticsHeader;
