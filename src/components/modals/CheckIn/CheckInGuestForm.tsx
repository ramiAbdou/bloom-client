import React from 'react';

import { ShowProps } from '@constants';
import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormErrorMessage from '@organisms/Form/FormErrorMessage';
import FormItem from '@organisms/Form/FormItem';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import useCreatePublicEventGuest from './useCreatePublicEventGuest';

const CheckInGuestForm: React.FC<ShowProps> = ({ show }) => {
  const createPublicEventGuest = useCreatePublicEventGuest();
  if (show === false) return null;

  return (
    <Form onSubmit={createPublicEventGuest}>
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

      <FormErrorMessage />
      <FormSubmitButton>RSVP</FormSubmitButton>
    </Form>
  );
};

export default CheckInGuestForm;
