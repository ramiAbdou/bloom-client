import deepequal from 'fast-deep-equal';
import React from 'react';

import { IdProps, ModalType } from '@constants';
import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormItem from '@organisms/Form/FormItem';
import FormSectionHeader from '@organisms/Form/FormSectionHeader';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import FormDate from '../../organisms/Form/FormDate';
import FormLongText from '../../organisms/Form/FormLongText';
import FormMultipleChoice from '../../organisms/Form/FormMultipleChoice';
import FormShortText from '../../organisms/Form/FormShortText';
import FormTime from '../../organisms/Form/FormTime';
import DeleteEventButton from './DeleteEventButton';
import useCreateEvent from './useCreateEvent';
import useUpdateEvent from './useUpdateEvent';

const CreateEventTimeItems: React.FC<IdProps> = () => {
  return (
    <>
      <Row align="end" className="mo-create-event-row">
        <FormDate id="START_DATE" title="Start Time" />
        <FormTime id="START_TIME" />
      </Row>

      <Row align="end" className="mo-create-event-row">
        <FormDate id="END_DATE" title="End Time" />
        <FormTime id="END_TIME" />
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
          required={false}
          title="Change Cover Photo"
          type="COVER_IMAGE"
          value={event?.imageUrl}
        />

        <FormItem
          id="EVENT_NAME"
          placeholder="New Event"
          title="Event Name"
          type="LARGE_TITLE"
          value={event?.title}
        />

        <FormLongText
          id="EVENT_DESCRIPTION"
          title="Event Description"
          value={event?.description}
        />

        <FormShortText
          id="EVENT_SUMMARY"
          required={false}
          title="1-Sentence Summary"
          value={event?.summary}
        />

        <FormSectionHeader>Event Details</FormSectionHeader>

        <FormShortText
          id="VIDEO_URL"
          title="Event Link"
          validate="IS_URL"
          value={event?.videoUrl}
        />

        {!id && <CreateEventTimeItems />}
        <FormSectionHeader>Privacy Settings</FormSectionHeader>

        <FormMultipleChoice
          required
          cardOptions={[{ label: 'Members Only' }, { label: 'Open to All' }]}
          className="mo-create-event-privacy-item"
          id="PRIVACY_SETTINGS"
          value={event?.private === false ? 'Open to All' : 'Members Only'}
        />

        <FormSubmitButton>
          {id ? 'Update Event' : 'Create Event'}
        </FormSubmitButton>

        <DeleteEventButton id={id} />
      </Form>
    </Modal>
  );
};

export default CreateEvent;
