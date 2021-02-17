import React from 'react';

import { QuestionCategory, ShowProps } from '@constants';
import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import useCreatePublicEventGuest from './useCreatePublicEventGuest';

const CheckInGuestForm: React.FC<ShowProps> = ({ show }) => {
  const createPublicEventGuest = useCreatePublicEventGuest();
  if (show === false) return null;

  return (
    <Form onSubmit={createPublicEventGuest}>
      <Row equal align="baseline" spacing="xs">
        <FormShortText
          category={QuestionCategory.FIRST_NAME}
          title="First Name"
        />

        <FormShortText
          category={QuestionCategory.LAST_NAME}
          title="Last Name"
        />
      </Row>

      <FormShortText category={QuestionCategory.EMAIL} title="Email" />
      <FormSubmitButton>RSVP</FormSubmitButton>
    </Form>
  );
};

export default CheckInGuestForm;
