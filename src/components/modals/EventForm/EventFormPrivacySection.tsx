import React from 'react';

import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import FormSection from '@organisms/Form/FormSection';
import FormSectionHeader from '@organisms/Form/FormSectionHeader';
import { EventPrivacy, IEvent } from '@store/db/Db.entities';
import { useStoreState } from '@store/Store';

const EventFormPrivacySection: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const privacy: EventPrivacy = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event?.privacy;
  });

  return (
    <FormSection>
      <FormSectionHeader title="Privacy Settings" />
      <FormMultipleChoice
        cardOptions={[{ label: 'Members Only' }, { label: 'Open to All' }]}
        className="mo-create-event-privacy-item"
        id="PRIVACY"
        value={
          privacy === EventPrivacy.MEMBERS_ONLY ? 'Members Only' : 'Open to All'
        }
      />
    </FormSection>
  );
};

export default EventFormPrivacySection;
