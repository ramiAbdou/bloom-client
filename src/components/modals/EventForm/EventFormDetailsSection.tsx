import React from 'react';

import { ShowProps } from '@util/constants';
import Row from '@containers/Row/Row';
import Show from '@containers/Show';
import FormDate from '@organisms/Form/FormDate';
import FormSection from '@organisms/Form/FormSection';
import FormShortText from '@organisms/Form/FormShortText';
import FormTime from '@organisms/Form/FormTime';
import { IEvent } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import FormSectionHeader from '../../organisms/Form/FormSectionHeader';

const EventFormTimeItems: React.FC<ShowProps> = ({ show }) => {
  return (
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
};

const EventFormDetailsSection: React.FC = () => {
  const eventId: string = useStoreState(({ modal }) => modal.metadata);

  const videoUrl: string = useStoreState(({ db }) => {
    const event: IEvent = db.byEventId[eventId];
    return event?.videoUrl;
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
