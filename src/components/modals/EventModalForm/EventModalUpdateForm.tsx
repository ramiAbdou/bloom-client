import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import Form from '@components/organisms/Form/Form';
import { OnFormSubmitFunction } from '@components/organisms/Form/Form.types';
import FormSubmitButton from '@components/organisms/Form/FormSubmitButton';
import { IEvent } from '@util/constants.entities';
import EventModalFormDeleteButton from './EventModalFormDeleteButton';
import EventModalFormDetailsSection from './EventModalFormDetailsSection';
import EventModalFormMainSection from './EventModalFormMainSection';
import EventModalFormPrivacySection from './EventModalFormPrivacySection';
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

const EventModalUpdateForm: React.FC = () => {
  const { data, loading } = useQuery<GetEventToUpdateByIdResult>(
    GET_EVENT_TO_UPDATE_BY_ID
  );

  const event: IEvent = data?.event;
  const updateEvent: OnFormSubmitFunction = useUpdateEvent();

  if (loading) return null;

  return (
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
  );
};

export default EventModalUpdateForm;
