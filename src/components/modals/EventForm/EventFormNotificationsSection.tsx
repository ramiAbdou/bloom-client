import React from 'react';

import FormMultipleChoice from '@components/organisms/Form/FormMultipleChoice';
import FormSection from '@components/organisms/Form/FormSection';
import FormSectionHeader from '@components/organisms/Form/FormSectionHeader';
import { IMember } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFind from '@gql/hooks/useFind';

const EventFormNotificationsSection: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

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
