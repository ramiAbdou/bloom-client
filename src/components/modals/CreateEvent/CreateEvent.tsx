import React from 'react';

import { ModalType } from '@constants';
import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import Modal from '@organisms/Modal/Modal';
import FormSectionHeader from '../../organisms/Form/FormSectionHeader';

const CreateEvent: React.FC = () => {
  return (
    <Modal
      className="mo-create-event"
      id={ModalType.CREATE_EVENT}
      options={{ sheet: true }}
    >
      <Form>
        <FormItem title="Change Cover Photo" type="COVER_IMAGE" />
        <FormSectionHeader>Event Details</FormSectionHeader>
        <FormItem required title="Event Description" type="LONG_TEXT" />

        <FormItem
          required
          title="Event Link"
          type="SHORT_TEXT"
          validate="IS_URL"
        />

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

        <FormSectionHeader>Privacy Settings</FormSectionHeader>

        <FormItem
          required
          cardOptions={[{ label: 'Private Event' }, { label: 'Public Event' }]}
          className="mo-create-event-privacy-item"
          id="PRIVACY_SETTINGS"
          type="MULTIPLE_CHOICE"
        />

        <FormSubmitButton>Create Event</FormSubmitButton>
      </Form>
    </Modal>
  );
};

export default CreateEvent;
