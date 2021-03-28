import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import MainHeader from '@containers/Main/MainHeader';
import { MainNavigationOptionProps } from '@containers/Main/MainNavigationButton';
import { useStoreActions, useStoreState } from '@store/Store';
import { LoadingProps, ModalType } from '@util/constants';

const CreateEventButton: React.FC = () => {
  const isAdmin = useStoreState(({ db }) => {
    return !!db.member.role;
  });

  const showModal = useStoreActions(({ modal }) => {
    return modal.showModal;
  });

  const onClick = () => {
    return showModal({ id: ModalType.CREATE_EVENT });
  };

  return (
    <Button primary show={isAdmin} onClick={onClick}>
      Create Event
    </Button>
  );
};

const EventsHeader: React.FC<LoadingProps> = ({ loading }) => {
  const { push } = useHistory();

  const options: MainNavigationOptionProps[] = [
    {
      onClick: () => {
        return push('upcoming');
      },
      pathname: 'upcoming',
      title: 'Upcoming'
    },
    {
      onClick: () => {
        return push('past');
      },
      pathname: 'past',
      title: 'Past'
    }
  ];

  return (
    <MainHeader loading={loading} options={options} title="Events">
      <CreateEventButton />
    </MainHeader>
  );
};

export default EventsHeader;
