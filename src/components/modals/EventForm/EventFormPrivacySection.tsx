import React from 'react';

import { EventPrivacy, IEvent } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import FormMultipleChoice from '@organisms/Form/FormMultipleChoice';
import FormSection from '@organisms/Form/FormSection';
import FormSectionHeader from '@organisms/Form/FormSectionHeader';
import { useStoreState } from '@store/Store';

const EventFormPrivacySection: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const { privacy } = useFindOne(IEvent, {
    fields: ['privacy'],
    where: { id: eventId }
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
