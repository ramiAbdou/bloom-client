import React from 'react';

import { useReactiveVar } from '@apollo/client';
import FormMultipleChoice from '@components/organisms/Form/FormMultipleChoice';
import FormSection from '@components/organisms/Form/FormSection';
import FormSectionHeader from '@components/organisms/Form/FormSectionHeader';
import { modalVar } from '@core/state/Modal.reactive';

const EventModalFormNotificationsSection: React.FC = () => {
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;
  if (!eventId) return null;

  return (
    <FormSection>
      <FormSectionHeader
        description="By default, every person who RSVP's will get a reminder email both 1 day and 1 hour before the event starts."
        title="Event Notifications"
      />

      <FormMultipleChoice
        required
        description="Would you like to send an email notification to members upon creating the event?"
        id="EVENT_NOTIFICATION"
        options={[`Send Email to All Members`, `Don't Send Email`]}
        title="Event Creation Email"
      />
    </FormSection>
  );
};

export default EventModalFormNotificationsSection;
