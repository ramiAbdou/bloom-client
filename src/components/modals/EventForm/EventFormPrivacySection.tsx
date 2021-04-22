import React from 'react';

import FormMultipleChoice from '@components/organisms/Form/FormMultipleChoice';
import FormSection from '@components/organisms/Form/FormSection';
import FormSectionHeader from '@components/organisms/Form/FormSectionHeader';
import { useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import { EventPrivacy, IEvent } from '@util/constants.entities';

const EventFormPrivacySection: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const { data: event, loading } = useFindOne(IEvent, {
    fields: ['privacy'],
    where: { id: eventId }
  });

  if (loading) return null;

  return (
    <FormSection>
      <FormSectionHeader title="Privacy Settings" />
      <FormMultipleChoice
        cardOptions={[{ label: 'Members Only' }, { label: 'Open to All' }]}
        className="mo-create-event-privacy-item"
        id="PRIVACY"
        value={
          event.privacy === EventPrivacy.MEMBERS_ONLY
            ? 'Members Only'
            : 'Open to All'
        }
      />
    </FormSection>
  );
};

export default EventFormPrivacySection;
