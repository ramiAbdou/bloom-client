import React from 'react';

import useQuery from '@gql/useQuery';
import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import FormSection from '@organisms/Form/FormSection';
import FormSectionHeader from '@organisms/Form/FormSectionHeader';
import { IMember } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';

const EventFormNotificationsSection: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.community.id);
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const { data } = useQuery<IMember[]>({
    fields: ['community.id', 'id'],
    operation: 'members',
    schema: [Schema.MEMBER],
    where: { communityId }
  });

  if (!data) return null;

  return (
    <FormSection show={data && !eventId}>
      <FormSectionHeader
        description="By default, every person who RSVP's will get a reminder email both 1 day and 1 hour before the event starts."
        title="Event Notifications"
      />

      <FormMultipleChoice
        required
        description="Would you like to send an email notification to members upon creating the event?"
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
