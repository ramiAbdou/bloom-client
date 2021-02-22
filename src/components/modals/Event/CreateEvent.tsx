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
import { EventPrivacy, IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import DeleteEventButton from './DeleteEventButton';
import useCreateEvent from './useCreateEvent';
import useUpdateEvent from './useUpdateEvent';

const CreateEventTimeItems: React.FC<ShowProps> = ({ show }) => {
  return (
    <Show show={show}>
      <Row wrap align="end" gap="xs">
        <FormDate className="f-2" id="START_DATE" title="Start Time" />
        <FormTime className="f-1" id="START_TIME" />
      </Row>

      <Row wrap align="end" gap="xs">
        <FormDate className="f-2" id="END_DATE" title="End Time" />
        <FormTime className="f-1" id="END_TIME" />
      </Row>
    </Show>
  );
};

const CreateEvent: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const {
    description,
    imageUrl,
    privacy,
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
          id="PRIVACY"
          value={
            privacy === EventPrivacy.MEMBERS_ONLY
              ? 'Members Only'
              : 'Open to All'
          }
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
