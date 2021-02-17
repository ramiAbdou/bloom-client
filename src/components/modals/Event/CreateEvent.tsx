import deepequal from 'fast-deep-equal';
import React from 'react';

import { ShowProps } from '@constants';
import Row from '@containers/Row/Row';
import Show from '@containers/Show';
import Form from '@organisms/Form/Form';
import FormCoverImage from '@organisms/Form/FormCoverImage';
import FormDate from '@organisms/Form/FormDate';
import FormLargeTitle from '@organisms/Form/FormLargeTitle';
import FormLongText from '@organisms/Form/FormLongText';
import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import FormSection from '@organisms/Form/FormSection';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import FormTime from '@organisms/Form/FormTime';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import DeleteEventButton from './DeleteEventButton';
import useCreateEvent from './useCreateEvent';
import useUpdateEvent from './useUpdateEvent';

const CreateEventTimeItems: React.FC<ShowProps> = ({ show }) => {
  return (
    <Show show={show}>
      <Row align="end" className="mo-create-event-row" spacing="xs">
        <FormDate id="START_DATE" title="Start Time" />
        <FormTime id="START_TIME" />
      </Row>

      <Row align="end" className="mo-create-event-row" spacing="xs">
        <FormDate id="END_DATE" title="End Time" />
        <FormTime id="END_TIME" />
      </Row>
    </Show>
  );
};

const CreateEvent: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const {
    description,
    imageUrl,
    private: membersOnly,
    summary,
    title,
    videoUrl
  }: IEvent = useStoreState(({ db }) => {
    return db.byEventId[eventId] ?? {};
  }, deepequal);

  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent(eventId);

  return (
    <Form spacing="lg" onSubmit={eventId ? updateEvent : createEvent}>
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

      <FormSection title="Event Details">
        <FormShortText
          id="VIDEO_URL"
          title="Event Link"
          validate="IS_URL"
          value={videoUrl}
        />

        <CreateEventTimeItems show={!eventId} />
      </FormSection>

      <FormSection title="Privacy Settings">
        <FormMultipleChoice
          cardOptions={[{ label: 'Members Only' }, { label: 'Open to All' }]}
          className="mo-create-event-privacy-item"
          id="PRIVACY_SETTINGS"
          value={membersOnly === false ? 'Open to All' : 'Members Only'}
        />
      </FormSection>

      <FormSubmitButton loadingText={eventId ? 'Updating...' : 'Creating...'}>
        {eventId ? 'Update Event' : 'Create Event'}
      </FormSubmitButton>

      <DeleteEventButton />
    </Form>
  );
};

export default CreateEvent;
