import deepequal from 'fast-deep-equal';
import React from 'react';

import FormCoverImage from '@organisms/Form/FormCoverImage';
import FormLargeTitle from '@organisms/Form/FormLargeTitle';
import FormLongText from '@organisms/Form/FormLongText';
import FormSection from '@organisms/Form/FormSection';
import FormShortText from '@organisms/Form/FormShortText';
import { IEvent } from '@db/Db.entities';
import { useStoreState } from '@store/Store';

const EventFormMainSection: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const { description, imageUrl, summary, title }: IEvent = useStoreState(
    ({ db }) => db.byEventId[eventId] ?? {},
    deepequal
  );

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
