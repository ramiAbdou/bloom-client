import deepequal from 'fast-deep-equal';
import React from 'react';

import { IdProps, ModalType } from '@constants';
import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import { IEvent } from '@store/entities';
import { useStoreState } from '@store/Store';
import FormSectionHeader from '../../organisms/Form/FormSectionHeader';
import useCreateEvent from './useCreateEvent';
import useUpdateEvent from './useUpdateEvent';

const CreateEventTimeItems: React.FC<IdProps> = () => {
  return (
    <>
      <Row align="end" className="mo-create-event-row" gap="sm">
        <FormItem
          required
          placeholder="January 10, 2021"
          title="Start Time"
          type="SHORT_TEXT"
        />

        <FormItem
          required
          id="START_TIME"
          placeholder="2:00 PM"
          type="SHORT_TEXT"
        />
      </Row>

      <Row align="end" className="mo-create-event-row" gap="sm">
        <FormItem
          required
          placeholder="January 10, 2021"
          title="End Time"
          type="SHORT_TEXT"
        />

        <FormItem
          required
          id="END_TIME"
          placeholder="3:00 PM"
          type="SHORT_TEXT"
        />
      </Row>
    </>
  );
};

const CreateEvent: React.FC<IdProps> = ({ id }) => {
  const event: IEvent = useStoreState(({ db }) => {
    const { byId: byEventsId } = db.entities.events;
    return byEventsId[id];
  }, deepequal);

  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent(id);

  return (
    <Modal
      className="mo-create-event"
      id={id ? `${ModalType.CREATE_EVENT}-${id}` : ModalType.CREATE_EVENT}
      options={{ sheet: true }}
    >
      <Form onSubmit={id ? updateEvent : createEvent}>
        <FormItem
          title="Change Cover Photo"
          type="COVER_IMAGE"
          value={event?.imageUrl}
        />

        <FormItem
          required
          id="EVENT_NAME"
          placeholder="New Event"
          title="Event Name"
          type="LARGE_TITLE"
          value={event?.title}
        />

        <FormItem
          required
          id="EVENT_DESCRIPTION"
          title="Event Description"
          type="LONG_TEXT"
          value={event?.description}
        />

        <FormItem
          id="EVENT_SUMMARY"
          title="1-Sentence Summary"
          type="SHORT_TEXT"
          value={event?.summary}
        />

        <FormSectionHeader>Event Details</FormSectionHeader>

        <FormItem
          required
          id="VIDEO_URL"
          title="Event Link"
          type="SHORT_TEXT"
          validate="IS_URL"
          value={event?.videoUrl}
        />

        {!id && <CreateEventTimeItems />}
        <FormSectionHeader>Privacy Settings</FormSectionHeader>

        <FormItem
          required
          cardOptions={[{ label: 'Members Only' }, { label: 'Open to All' }]}
          className="mo-create-event-privacy-item"
          id="PRIVACY_SETTINGS"
          type="MULTIPLE_CHOICE"
          value={event?.private === false ? 'Open to All' : 'Members Only'}
        />

        <FormSubmitButton>
          {id ? 'Update Event' : 'Create Event'}
        </FormSubmitButton>
      </Form>
    </Modal>
  );
};

export default CreateEvent;
