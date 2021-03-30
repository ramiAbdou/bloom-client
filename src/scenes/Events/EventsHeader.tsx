import { ActionCreator } from 'easy-peasy';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@atoms/Button/Button';
import MainHeader from '@containers/Main/MainHeader';
import { MainNavigationOptionProps } from '@containers/Main/MainNavigationButton';
import { ModalData } from '@organisms/Modal/Modal.types';
import { useStoreActions, useStoreState } from '@store/Store';
import { LoadingProps, ModalType } from '@util/constants';

const EventsHeaderCreateEventButton: React.FC = () => {
  const isAdmin: boolean = useStoreState(({ db }) => !!db.member.role);

  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const onClick = (): void => {
    showModal({ id: ModalType.CREATE_EVENT });
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
