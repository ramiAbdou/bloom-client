import React from 'react';

import { gql } from '@apollo/client';
import FormCoverImage from '@components/organisms/Form/FormCoverImage';
import FormLargeTitle from '@components/organisms/Form/FormLargeTitle';
import FormLongText from '@components/organisms/Form/FormLongText';
import FormSection from '@components/organisms/Form/FormSection';
import FormShortText from '@components/organisms/Form/FormShortText';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const EventModalFormMainSection: ComponentWithFragments<IEvent> = ({
  data: event
}) => (
  <FormSection>
    <FormCoverImage
      id="COVER_IMAGE"
      required={false}
      title="Change Cover Photo"
      value={event.imageUrl}
    />

    <FormLargeTitle
      id="EVENT_NAME"
      placeholder="New Event"
      title="Event Name"
      value={event.title}
    />

    <FormLongText
      id="EVENT_DESCRIPTION"
      title="Event Description"
      value={event.description}
    />

    <FormShortText
      id="EVENT_SUMMARY"
      required={false}
      title="1-Sentence Summary"
      value={event.summary}
    />
  </FormSection>
);

EventModalFormMainSection.fragment = gql`
  fragment EventModalFormMainSectionFragment on events {
    description
    imageUrl
    summary
    title
  }
`;

export default EventModalFormMainSection;
