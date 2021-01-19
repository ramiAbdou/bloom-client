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
        <FormSectionHeader>Event Details</FormSectionHeader>
        <FormItem title="Event Description" type="LONG_TEXT" />
        <FormItem title="Event Link" type="SHORT_TEXT" validate="IS_URL" />

        <Row align="end" className="mo-create-event-row" gap="sm">
          <FormItem title="Start Time" type="SHORT_TEXT" validate="IS_URL" />
          <FormItem id="START_TIME" type="SHORT_TEXT" validate="IS_URL" />
        </Row>

        <Row align="end" className="mo-create-event-row" gap="sm">
          <FormItem title="End Time" type="SHORT_TEXT" validate="IS_URL" />
          <FormItem id="END_TIME" type="SHORT_TEXT" validate="IS_URL" />
        </Row>

        <FormSectionHeader>Privacy Settings</FormSectionHeader>

        <FormItem
          card
          cardOptions={[{ label: 'Private Event' }, { label: 'Public Event' }]}
          title="End Time"
          type="MULTIPLE_CHOICE"
          validate="IS_URL"
        />

        <FormSubmitButton>Create Event</FormSubmitButton>
      </Form>
    </Modal>
  );
};

export default CreateEvent;
