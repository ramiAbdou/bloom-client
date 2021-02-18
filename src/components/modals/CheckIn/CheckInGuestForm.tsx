import day from 'dayjs';
import React from 'react';

import { QuestionCategory, ShowProps } from '@constants';
import Row from '@containers/Row/Row';
import Form from '@organisms/Form/Form';
import FormShortText from '@organisms/Form/FormShortText';
import FormSubmitButton from '@organisms/Form/FormSubmitButton';
import { useStoreState } from '@store/Store';
import useCreatePublicEventAttendee from './useCreatePublicEventAttendee';
import useCreatePublicEventGuest from './useCreatePublicEventGuest';

const CheckInGuestForm: React.FC<ShowProps> = ({ show }) => {
  const isUpcoming: boolean = useStoreState(({ db }) => {
    return day().isBefore(day(db.event?.startTime).subtract(30, 'm'));
  });

  const createPublicEventAttendee = useCreatePublicEventAttendee();
  const createPublicEventGuest = useCreatePublicEventGuest();

  if (show === false) return null;

  return (
    <Form
      onSubmit={isUpcoming ? createPublicEventGuest : createPublicEventAttendee}
    >
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
      <FormSubmitButton>{isUpcoming ? 'RSVP' : 'Join'}</FormSubmitButton>
    </Form>
  );
};

export default CheckInGuestForm;
