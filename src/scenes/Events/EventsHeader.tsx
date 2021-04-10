import { ActionCreator } from 'easy-peasy';
import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@components/atoms/Button/Button';
import MainHeader from '@components/containers/Main/MainHeader';
import { MainNavigationOptionProps } from '@components/containers/Main/MainNavigationButton';
import { ModalData } from '@components/organisms/Modal/Modal.types';
import { IMember } from '@core/db/db.entities';
import { useStoreActions, useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import { LoadingProps, ModalType } from '@util/constants';

const EventsHeaderCreateEventButton: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { role } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const onClick = (): void => {
    showModal({ id: ModalType.CREATE_EVENT });
  };

  return (
    <Button primary show={!!role} onClick={onClick}>
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
