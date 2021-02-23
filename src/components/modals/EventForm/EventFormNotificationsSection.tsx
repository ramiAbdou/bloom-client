import deline from 'deline';
import React from 'react';

import useQuery from '@hooks/useQuery';
import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import FormSection from '@organisms/Form/FormSection';
import FormSectionHeader from '@organisms/Form/FormSectionHeader';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';

const EventFormNotificationsSection: React.FC = () => {
  const { data } = useQuery<IMember[]>({
    fields: ['id', { community: ['id'] }],
    operation: 'getCommunityMembers',
    schema: [Schema.MEMBER]
  });

  if (!data) return null;

  return (
    <FormSection>
      <FormSectionHeader
        description={deline`
          By default, every person who RSVP's will get a reminder email both 1
          day and 1 hour before the event starts.
        `}
        title="Event Notifications"
      />

      <FormMultipleChoice
        required
        description={deline`
          Would you like to send an email notification to members upon creating
          the event?
        `}
        id="EVENT_NOTIFICATION"
        options={[
          `Send Email to All ${data?.length} Members`,
          `Don't Send Email`
        ]}
        title="Event Creation Email"
      />
    </FormSection>
  );
};

export default EventFormNotificationsSection;
