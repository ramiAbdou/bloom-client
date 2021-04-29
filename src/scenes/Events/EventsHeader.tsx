import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@components/atoms/Button/Button';
import MainHeader from '@components/containers/Main/MainHeader';
import { MainNavigationOptionProps } from '@components/containers/Main/MainNavigationButton';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { LoadingProps, ModalType } from '@util/constants';
import { MemberRole } from '@util/constants.entities';
import useMemberRole from '../../core/hooks/useMemberRole';

const EventsHeaderCreateEventButton: React.FC = () => {
  const role: MemberRole = useMemberRole();

  if (!role) return null;

  const onClick = (): void => {
    showModal({ id: ModalType.CREATE_EVENT, options: { sheet: true } });
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
