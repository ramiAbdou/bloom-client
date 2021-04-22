import React from 'react';
import { useHistory } from 'react-router-dom';
import { memberIdVar } from 'src/App.reactive';

import { ApolloClient, useApolloClient, useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import MainHeader from '@components/containers/Main/MainHeader';
import { MainNavigationOptionProps } from '@components/containers/Main/MainNavigationButton';
import { modalVar } from '@core/state/Modal.reactive';
import { LoadingProps, ModalType } from '@util/constants';
import { IMember } from '@util/constants.entities';
import MEMBER_ROLE_FRAGMENT from '../../gql/fragments/MemberRoleFragment';

const EventsHeaderCreateEventButton: React.FC = () => {
  const apolloClient: ApolloClient<unknown> = useApolloClient();
  const memberId: string = useReactiveVar(memberIdVar);

  const member: IMember = apolloClient.cache.readFragment({
    fragment: MEMBER_ROLE_FRAGMENT,
    id: `members:${memberId}`
  });

  if (!member.role) return null;

  const onClick = (): void => {
    modalVar({ id: ModalType.CREATE_EVENT, options: { sheet: true } });
  };

  return (
    <Button primary onClick={onClick}>
      Create Event
    </Button>
  );
};

const EventsHeader: React.FC<LoadingProps> = ({ loading }) => {
  const { push } = useHistory();

  const options: MainNavigationOptionProps[] = [
    {
      onClick: () => push('upcoming'),
      pathname: 'upcoming',
      title: 'Upcoming'
    },
    {
      onClick: () => push('past'),
      pathname: 'past',
      title: 'Past'
    }
  ];

  return (
    <MainHeader loading={loading} options={options} title="Events">
      <EventsHeaderCreateEventButton />
    </MainHeader>
  );
};

export default EventsHeader;
