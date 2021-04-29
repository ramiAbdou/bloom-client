import day from 'dayjs';
import React from 'react';

import { DocumentNode, gql, useQuery, useReactiveVar } from '@apollo/client';
import Modal from '@components/organisms/Modal/Modal';
import { modalVar } from '@components/organisms/Modal/Modal.state';
import ModalCloseButton from '@components/organisms/Modal/ModalCloseButton';
import { IEvent } from '@util/constants.entities';
import { ErrorType } from '@util/constants.errors';

interface GetEventErrorByIdResult {
  event: IEvent;
}

const GET_EVENT_ERROR_BY_ID: DocumentNode = gql`
  query GetEventErrorById($eventId: String!) {
    eventId @client @export(as: "eventId")

    event(id: $eventId) {
      id
      startTime
      title
    }
  }
`;

const ViewEventErrorModal: React.FC = () => {
  const { data, loading } = useQuery<GetEventErrorByIdResult>(
    GET_EVENT_ERROR_BY_ID
  );

  const event: IEvent = data?.event;

  const error:
    | ErrorType.EVENT_FINISHED
    | ErrorType.EVENT_HASNT_STARTED = useReactiveVar(modalVar)?.metadata as
    | ErrorType.EVENT_FINISHED
    | ErrorType.EVENT_HASNT_STARTED;

  if (loading) return null;

  const formattedStartTime: string = day(event.startTime).format(
    'MMMM, D @ h:mm A'
  );

  const title: string =
    error === ErrorType.EVENT_HASNT_STARTED
      ? `Event Hasn't Started`
      : `Event Finished`;

  const description: string =
    error === ErrorType.EVENT_HASNT_STARTED
      ? `${event.title} is happening on ${formattedStartTime}. You will be able to join 10 minutes before the event starts.`
      : `${event.title} happened on ${formattedStartTime}.`;

  return (
    <Modal>
      <h1 className="c-primary mb-sm--nlc">{title}</h1>
      <p>{description}</p>
      <ModalCloseButton title="Got It" />
    </Modal>
  );
};

export default ViewEventErrorModal;
