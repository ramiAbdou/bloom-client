import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Form, { OnFormSubmitFunction } from '@components/organisms/Form/Form';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import Modal from '@components/organisms/Modal/Modal';
import { IEvent } from '@util/constants.entities';
import EventModalFormDeleteButton from '../CreateEventModal/EventModalFormDeleteButton';
import EventModalFormDetailsSection from '../CreateEventModal/EventModalFormDetailsSection';
import EventModalFormMainSection from '../CreateEventModal/EventModalFormMainSection';
import EventModalFormPrivacySection from '../CreateEventModal/EventModalFormPrivacySection';
import useUpdateEvent from './useUpdateEvent';

interface GetEventToUpdateByIdResult {
  event: IEvent;
}

const GET_EVENT_TO_UPDATE_BY_ID: DocumentNode = gql`
  query GetEventToUpdateById($eventId: String!) {
    eventId @client @export(as: "eventId")

    event(id: $eventId) {
      id
      ...EventModalFormDetailsSectionFragment
      ...EventModalFormMainSectionFragment
      ...EventModalFormPrivacySectionFragment
    }
  }
  ${EventModalFormDetailsSection.fragment}
  ${EventModalFormMainSection.fragment}
  ${EventModalFormPrivacySection.fragment}
`;

const UpdateEventModal: React.FC = () => {
  const { data, loading } = useQuery<GetEventToUpdateByIdResult>(
    GET_EVENT_TO_UPDATE_BY_ID
  );

  const event: IEvent = data?.event;
  const updateEvent: OnFormSubmitFunction = useUpdateEvent();

  if (loading) return null;

  return (
    <Modal>
      <Form
        className="mx-auto w-10 w-100--mt"
        spacing="lg"
        onSubmit={updateEvent}
      >
        <EventModalFormMainSection data={event} />
        <EventModalFormDetailsSection data={event} />
        <EventModalFormPrivacySection data={event} />
        <FormSubmitButton loadingText="Updating...">
          Update Event
        </FormSubmitButton>
        <EventModalFormDeleteButton />
      </Form>
    </Modal>
  );
};

export default UpdateEventModal;
