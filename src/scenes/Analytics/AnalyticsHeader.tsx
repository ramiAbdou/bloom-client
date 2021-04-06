import React from 'react';
import { useHistory } from 'react-router-dom';

import MainHeader from '@containers/Main/MainHeader';
import { MainNavigationOptionProps } from '@containers/Main/MainNavigationButton';

const AnalyticsHeader: React.FC = () => {
  const { push } = useHistory();

  const options: MainNavigationOptionProps[] = [
    {
      onClick: () => push('members'),
      pathname: 'members',
      title: 'Members'
    },
    {
      onClick: () => push('events'),
      pathname: 'events',
      title: 'Events'
    }
  ];

  return <MainHeader options={options} title="Analytics" />;
};

export default AnalyticsHeader;
