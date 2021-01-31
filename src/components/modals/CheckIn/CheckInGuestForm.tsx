import React from 'react';

import { ShowProps } from '@constants';
import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import FormShortText from '../../organisms/Form/FormShortText';
import useCreatePublicEventGuest from './useCreatePublicEventGuest';

const CheckInGuestForm: React.FC<ShowProps> = ({ show }) => {
  const createPublicEventGuest = useCreatePublicEventGuest();
  if (show === false) return null;

  return (
    <Form onSubmit={createPublicEventGuest}>
      <Row equal align="baseline" spacing="xs">
        <FormShortText category="FIRST_NAME" title="First Name" />
        <FormShortText category="LAST_NAME" title="Last Name" />
      </Row>

      <FormShortText category="EMAIL" title="Email" />
      <FormSubmitButton>RSVP</FormSubmitButton>
    </Form>
  );
};

export default CheckInGuestForm;
