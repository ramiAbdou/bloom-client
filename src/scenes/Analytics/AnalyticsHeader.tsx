import React from 'react';
import { useHistory } from 'react-router-dom';

import MainHeader from '@components/containers/Main/MainHeader';
import { MainNavigationOptionProps } from '@components/containers/Main/MainNavigationButton';

const AnalyticsHeader: React.FC = () => {
  const { push } = useHistory();

  const onEventsClick = (): void => {
    push('events');
  };

  const onMembersClick = (): void => {
    push('members');
  };

  const options: MainNavigationOptionProps[] = [
    { onClick: onMembersClick, pathname: 'members', title: 'Members' },
    { onClick: onEventsClick, pathname: 'events', title: 'Events' }
  ];

  return <MainHeader options={options} title="Analytics" />;
};

export default AnalyticsHeader;
