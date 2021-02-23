import deline from 'deline';
import React from 'react';

import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import FormSection from '@organisms/Form/FormSection';
import FormSectionHeader from '@organisms/Form/FormSectionHeader';
import { IMember, MemberStatus } from '@store/Db/entities';
import { useStoreState } from '@store/Store';

const EventFormNotificationsSection: React.FC = () => {
  const numMembers: number = useStoreState(({ db }) => {
    return db.community.members?.filter((memberId: string) => {
      const member: IMember = db.byMemberId[memberId];
      return member.status === MemberStatus.ACCEPTED;
    })?.length;
  });

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
        options={[
          `Send Email to All ${numMembers} Members`,
          `Don't Send Email`
        ]}
        title="Event Creation Email"
      />
    </FormSection>
  );
};

export default EventFormNotificationsSection;
