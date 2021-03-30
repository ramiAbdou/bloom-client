import React from 'react';
import { useHistory } from 'react-router-dom';

import MainHeader from '@containers/Main/MainHeader';
import { MainNavigationOptionProps } from '@containers/Main/MainNavigationButton';
import { useStoreState } from '@store/Store';

const AnalyticsHeader: React.FC = () => {
  const canCollectDues: boolean = useStoreState(
    ({ db }) => db.community.canCollectDues
  );

  const { push } = useHistory();

  const duesOptions: MainNavigationOptionProps[] = canCollectDues
    ? [
        {
          onClick: () => push('payments'),
          pathname: 'payments',
          title: 'Payments'
        }
      ]
    : [];

  const options: MainNavigationOptionProps[] = [
    {
      onClick: () => push('members'),
      pathname: 'members',
      title: 'Members'
    },
    ...duesOptions,
    {
      onClick: () => push('events'),
      pathname: 'events',
      title: 'Events'
    }
  ];

  return <MainHeader options={options} title="Analytics" />;
};

export default AnalyticsHeader;
