import React from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import FormMultipleChoice from '@components/organisms/Form/FormMultipleChoice';
import FormSection from '@components/organisms/Form/FormSection';
import FormSectionHeader from '@components/organisms/Form/FormSectionHeader';
import { modalVar } from '@core/state/Modal.reactive';
import useFind from '@gql/hooks/useFind';
import { IMember } from '@util/constants.entities';

const EventFormNotificationsSection: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;

  const { data: members, loading } = useFind(IMember, {
    fields: ['id'],
    where: { communityId }
  });

  if (loading) return null;

  return (
    <FormSection show={members && !eventId}>
      <FormSectionHeader
        description="By default, every person who RSVP's will get a reminder email both 1 day and 1 hour before the event starts."
        title="Event Notifications"
      />

      <FormMultipleChoice
        required
        description="Would you like to send an email notification to members upon creating the event?"
        id="EVENT_NOTIFICATION"
        options={[
          `Send Email to All ${members?.length} Members`,
          `Don't Send Email`
        ]}
        title="Event Creation Email"
      />
    </FormSection>
  );
};

export default EventFormNotificationsSection;
