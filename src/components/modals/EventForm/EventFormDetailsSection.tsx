import React from 'react';

import Row from '@components/containers/Row/Row';
import Show from '@components/containers/Show';
import FormDate from '@components/organisms/Form/FormDate';
import FormSection from '@components/organisms/Form/FormSection';
import FormSectionHeader from '@components/organisms/Form/FormSectionHeader';
import FormShortText from '@components/organisms/Form/FormShortText';
import FormTime from '@components/organisms/Form/FormTime';
import { useStoreState } from '@core/store/Store';
import { IEvent } from '@core/db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import { ShowProps } from '@util/constants';

const EventFormTimeItems: React.FC<ShowProps> = ({ show }) => (
  <Show show={show}>
    <Row wrap align="end" gap="xs">
      <FormDate className="f-2" id="START_DATE" title="Start Time" />
      <FormTime className="f-1" id="START_TIME" />
    </Row>

    <Row wrap align="end" gap="xs">
      <FormDate className="f-2" id="END_DATE" title="End Time" />
      <FormTime className="f-1" id="END_TIME" />
    </Row>
  </Show>
);

const EventFormDetailsSection: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const { videoUrl } = useFindOne(IEvent, {
    fields: ['videoUrl'],
    where: { id: eventId }
  });

  return (
    <FormSection>
      <FormSectionHeader title="Event Details" />

      <FormShortText
        id="VIDEO_URL"
        title="Event Link"
        validate="IS_URL"
        value={videoUrl}
      />

      <EventFormTimeItems show={!eventId} />
    </FormSection>
  );
};

export default EventFormDetailsSection;
