import React from 'react';

import FormCoverImage from '@components/organisms/Form/FormCoverImage';
import FormLargeTitle from '@components/organisms/Form/FormLargeTitle';
import FormLongText from '@components/organisms/Form/FormLongText';
import FormSection from '@components/organisms/Form/FormSection';
import FormShortText from '@components/organisms/Form/FormShortText';
import { useStoreState } from '@core/store/Store';
import { IEvent } from '@core/db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';

const EventFormMainSection: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const { description, imageUrl, summary, title } = useFindOne(IEvent, {
    fields: ['description', 'imageUrl', 'summary', 'title'],
    where: { id: eventId }
  });

  return (
    <FormSection>
      <FormCoverImage
        id="COVER_IMAGE"
        required={false}
        title="Change Cover Photo"
        value={imageUrl}
      />

      <FormLargeTitle
        id="EVENT_NAME"
        placeholder="New Event"
        title="Event Name"
        value={title}
      />

      <FormLongText
        id="EVENT_DESCRIPTION"
        title="Event Description"
        value={description}
      />

      <FormShortText
        id="EVENT_SUMMARY"
        required={false}
        title="1-Sentence Summary"
        value={summary}
      />
    </FormSection>
  );
};

export default EventFormMainSection;
