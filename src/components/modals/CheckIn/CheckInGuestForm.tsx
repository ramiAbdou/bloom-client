import React from 'react';

import { ShowProps } from '@constants';
import Row from '@containers/Row/Row';
import useMutation from '@hooks/useMutation';
import Form from '@organisms/Form/Form';
import { OnFormSubmitArgs } from '@organisms/Form/Form.types';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import {
  CREATE_EVENT_GUEST,
  CreateEventGuestArgs
} from '@scenes/Events/Events.gql';
import { IEventGuest } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const CheckInGuestForm: React.FC<ShowProps> = ({ show }) => {
  const eventId = useStoreState(({ db }) => db.event.id);

  const [createEventGuest] = useMutation<IEventGuest, CreateEventGuestArgs>({
    name: 'createEventGuest',
    query: CREATE_EVENT_GUEST,
    schema: Schema.EVENT_GUEST
  });

  if (show === false) return null;

  const onSubmit = async ({ items }: OnFormSubmitArgs) => {
    const firstName = items.find(({ category }) => category === 'FIRST_NAME')
      ?.value;

    const lastName = items.find(({ category }) => category === 'LAST_NAME')
      ?.value;

    const email = items.find(({ category }) => category === 'EMAIL')?.value;

    await createEventGuest({ email, eventId, firstName, lastName });
  };

  return (
    <Form onSubmit={onSubmit}>
      <Row equal align="baseline" spacing="xs">
        <FormItem
          required
          category="FIRST_NAME"
          title="First Name"
          type="SHORT_TEXT"
        />

        <FormItem
          required
          category="LAST_NAME"
          title="Last Name"
          type="SHORT_TEXT"
        />
      </Row>

      <FormItem
        required
        category="EMAIL"
        title="Email"
        type="SHORT_TEXT"
        validate="IS_EMAIL"
      />

      <FormSubmitButton>RSVP</FormSubmitButton>
    </Form>
  );
};

export default CheckInGuestForm;
