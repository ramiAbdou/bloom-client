import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button';
import { LoadingProps, ModalType } from '@constants';
import MainHeader from '@containers/Main/MainHeader';
import { NavigationOptionProps } from '@containers/Main/MainNavigation';
import { useStoreActions, useStoreState } from '@store/Store';

const CreateEventButton: React.FC = () => {
  const isAdmin = useStoreState(({ db }) => !!db.member.role);
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(ModalType.CREATE_EVENT);

  return (
    <Button primary show={isAdmin} onClick={onClick}>
      Create Event
    </Button>
  );
};

const EventsHeader: React.FC<LoadingProps> = ({ loading }) => {
  const { push } = useHistory();

  const options: NavigationOptionProps[] = [
    {
      onClick: () => push('upcoming'),
      pathname: 'upcoming',
      title: 'Upcoming'
    },
    { onClick: () => push('past'), pathname: 'past', title: 'Past' }
  ];

  return (
    <MainHeader
      className="s-database-header"
      loading={loading}
      options={options}
      title="Events"
    >
      <CreateEventButton />
    </MainHeader>
  );
};

export default EventsHeader;
