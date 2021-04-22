import { ActionCreator } from 'easy-peasy';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import MainHeader from '@components/containers/Main/MainHeader';
import { MainNavigationOptionProps } from '@components/containers/Main/MainNavigationButton';
import { ModalData } from '@components/organisms/Modal/Modal.types';
import { IMember } from '@core/db/db.entities';
import useFindOne from '@core/gql/hooks/useFindOne';
import { useStoreActions } from '@core/store/Store';
import { LoadingProps, ModalType } from '@util/constants';

const EventsHeaderCreateEventButton: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['role'],
    where: { id: memberId }
  });

  if (loading) return null;

  const onClick = (): void => {
    showModal({ id: ModalType.CREATE_EVENT });
  };

  return (
    <Button primary show={!!member.role} onClick={onClick}>
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
