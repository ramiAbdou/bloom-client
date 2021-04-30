import React from 'react';
import { eventIdVar } from 'src/App.reactive';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Modal from '@components/organisms/Modal/Modal';
import Story from '@components/organisms/Story/Story';
import useIsMember from '@hooks/useIsMember';
import { EventPrivacy, IEvent } from '@util/constants.entities';
import CheckInModalMainPage from './CheckInModalMainPage';
import CheckInModalMemberStatusPage from './CheckInModalMemberStatusPage';

interface GetEventCheckInByIdArgs {
  eventId: string;
}

interface GetEventCheckInByIdResult {
  event: IEvent;
}

const GET_EVENT_CHECK_IN_BY_ID: DocumentNode = gql`
  query GetEventCheckInById($eventId: String!) {
    event(id: $eventId) {
      id
      privacy
      ...CheckInModalMainPageFragment
      ...CheckInModalMemberStatusPageFragment
    }
  }
  ${CheckInModalMainPage.fragment}
  ${CheckInModalMemberStatusPage.fragment}
`;

const CheckInModal: React.FC = () => {
  const eventId: string = eventIdVar();
  const isMember: boolean = useIsMember();

  const { data, loading } = useQuery<
    GetEventCheckInByIdResult,
    GetEventCheckInByIdArgs
  >(GET_EVENT_CHECK_IN_BY_ID, { variables: { eventId } });

  const event: IEvent = data?.event;

  if (loading) return null;

  const lock: boolean =
    event.privacy === EventPrivacy.MEMBERS_ONLY && !isMember;

  return (
    <Modal>
      <Story>
        <CheckInModalMemberStatusPage data={event} />
        <CheckInModalMainPage data={event} lock={lock} />
        {/*
        <CheckInConfirmation /> */}
      </Story>
    </Modal>
  );
};

export default CheckInModal;
