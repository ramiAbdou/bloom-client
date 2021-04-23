import React from 'react';

import { useReactiveVar } from '@apollo/client';
import FormCoverImage from '@components/organisms/Form/FormCoverImage';
import FormLargeTitle from '@components/organisms/Form/FormLargeTitle';
import FormLongText from '@components/organisms/Form/FormLongText';
import FormSection from '@components/organisms/Form/FormSection';
import FormShortText from '@components/organisms/Form/FormShortText';
import { modalVar } from '@core/state/Modal.reactive';
import useFindOne from '@gql/hooks/useFindOne';
import { IEvent } from '@util/constants.entities';

const EventFormMainSection: React.FC = () => {
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['description', 'imageUrl', 'summary', 'title'],
    where: { id: eventId }
  });

  if (loading) return null;

  return (
    <FormSection>
      <FormCoverImage
        id="COVER_IMAGE"
        required={false}
        title="Change Cover Photo"
        value={event.imageUrl}
      />

      <FormLargeTitle
        id="EVENT_NAME"
        placeholder="New Event"
        title="Event Name"
        value={event.title}
      />

      <FormLongText
        id="EVENT_DESCRIPTION"
        title="Event Description"
        value={event.description}
      />

      <FormShortText
        id="EVENT_SUMMARY"
        required={false}
        title="1-Sentence Summary"
        value={event.summary}
      />
    </FormSection>
  );
};

export default EventFormMainSection;
