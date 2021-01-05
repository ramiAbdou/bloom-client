import React from 'react';
import { useHistory } from 'react-router-dom';

import MainHeader from '@templates/Main/Header';
import { NavigationOptionProps } from '@templates/Main/Navigation';

const AnalyticsHeader = () => {
  const { push } = useHistory();

  const options: NavigationOptionProps[] = [
    { onClick: () => push('members'), pathname: 'members', title: 'Members' },
    { onClick: () => push('dues'), pathname: 'dues', title: 'Dues' },
    { onClick: () => push('events'), pathname: 'events', title: 'Events' }
  ];

  return (
    <MainHeader
      className="s-analytics-header"
      options={options}
      title="Analytics"
    />
  );
};

export default AnalyticsHeader;
