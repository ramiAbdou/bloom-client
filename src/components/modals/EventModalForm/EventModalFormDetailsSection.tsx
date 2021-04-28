import React from 'react';

import { gql, useReactiveVar } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import FormDate from '@components/organisms/Form/FormDate';
import FormSection from '@components/organisms/Form/FormSection';
import FormSectionHeader from '@components/organisms/Form/FormSectionHeader';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormTime from '@components/organisms/Form/FormTime';
import { modalVar } from '@core/state/Modal.reactive';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';

const EventModalFormTimeItems: React.FC = () => {
  const eventId: string = useReactiveVar(modalVar)?.metadata as string;
  if (eventId) return null;

  return (
    <>
      <Row wrap align="end" gap="xs">
        <FormDate className="f-2" id="START_DATE" title="Start Time" />
        <FormTime className="f-1" id="START_TIME" />
      </Row>

      <Row wrap align="end" gap="xs">
        <FormDate className="f-2" id="END_DATE" title="End Time" />
        <FormTime className="f-1" id="END_TIME" />
      </Row>
    </>
  );
};

const EventModalFormDetailsSection: ComponentWithFragments<IEvent> = ({
  data: event
}) => (
  <FormSection>
    <FormSectionHeader title="Event Details" />

    <FormShortText
      id="VIDEO_URL"
      title="Event Link"
      validate="IS_URL"
      value={event.videoUrl}
    />

    <EventModalFormTimeItems />
  </FormSection>
);

EventModalFormDetailsSection.fragment = gql`
  fragment EventModalFormDetailsSectionFragment on events {
    videoUrl
  }
`;

export default EventModalFormDetailsSection;
