import React from 'react';

import { gql } from '@apollo/client';
import FormMultipleChoice from '@components/organisms/Form/FormMultipleChoice';
import FormSection from '@components/organisms/Form/FormSection';
import FormSectionHeader from '@components/organisms/Form/FormSectionHeader';
import { ComponentWithFragments } from '@util/constants';
import { EventPrivacy, IEvent } from '@util/constants.entities';

const EventModalFormPrivacySection: ComponentWithFragments<IEvent> = ({
  data: event
}) => {
  const value: string =
    event?.privacy === EventPrivacy.MEMBERS_ONLY
      ? 'Members Only'
      : 'Open to All';

  return (
    <FormSection>
      <FormSectionHeader title="Privacy Settings" />
      <FormMultipleChoice
        cardOptions={[{ label: 'Members Only' }, { label: 'Open to All' }]}
        className="mo-create-event-privacy-item"
        id="PRIVACY"
        value={value}
      />
    </FormSection>
  );
};

EventModalFormPrivacySection.fragment = gql`
  fragment EventModalFormPrivacySectionFragment on events {
    privacy
  }
`;

export default EventModalFormPrivacySection;
