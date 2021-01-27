import day from 'dayjs';
import React from 'react';

import Separator from '@atoms/Separator';
import MainSection from '@containers/Main/MainSection';
import Row from '@containers/Row/Row';
import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { IEvent } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import {
  GET_EVENT_ATTENDEES_SERIES,
  GET_EVENT_GUESTS_SERIES,
  GetEventArgs
} from '../Events.gql';

const IndividualEventAttendeesAnalytics: React.FC = () => {
  const eventId = useStoreState(({ db }) => db.event?.id);
  const attendeesSeries = useStoreState(({ db }) => db.event?.attendeesSeries);

  const { loading } = useQuery<IEvent, GetEventArgs>({
    name: 'getEvent',
    query: GET_EVENT_ATTENDEES_SERIES,
    schema: Schema.EVENT,
    variables: { eventId }
  });

  if (loading || attendeesSeries?.every(({ value }) => !value)) return null;

  return (
    <Chart
      data={attendeesSeries}
      interval={2}
      options={{
        format: 'HOUR',
        xAxis: {
          interval: 'preserveStartEnd',
          tickFormatter: (label) => {
            return day(label).format('h:mm A');
          }
        },
        yAxis: { domain: [0, (dataMax: number) => dataMax + 5] }
      }}
      show={!loading}
      title="Total Attendees"
      type={ChartType.TIME_SERIES}
    />
  );
};

const IndividualEventGuestsAnalytics: React.FC = () => {
  const eventId = useStoreState(({ db }) => db.event?.id);
  const guestsSeries = useStoreState(({ db }) => db.event?.guestsSeries);

  const { loading } = useQuery<IEvent, GetEventArgs>({
    name: 'getEvent',
    query: GET_EVENT_GUESTS_SERIES,
    schema: Schema.EVENT,
    variables: { eventId }
  });

  if (loading || guestsSeries?.every(({ value }) => !value)) return null;

  return (
    <Chart
      data={guestsSeries}
      interval={2}
      options={{
        format: 'HOUR',
        xAxis: { interval: 'preserveStartEnd' },
        yAxis: { domain: [0, (dataMax: number) => dataMax + 5] }
      }}
      show={!loading}
      title="Total RSVP's"
      type={ChartType.TIME_SERIES}
    />
  );
};

const IndividualEventAnalytics: React.FC = () => {
  const attendeesSeries = useStoreState(({ db }) => db.event?.attendeesSeries);
  const guestsSeries = useStoreState(({ db }) => db.event?.guestsSeries);
  const isAdmin = useStoreState(({ db }) => !!db.member.role);

  // If not admin or no RSVP's have been collected, don't show!
  if (
    !isAdmin ||
    (guestsSeries?.every(({ value }) => !value) &&
      attendeesSeries?.every(({ value }) => !value))
  ) {
    return null;
  }

  return (
    <div className="s-events-individual-analytics">
      <Separator marginBottom={36} marginTop={0} />

      <MainSection loading={false} title="Event Analytics">
        <Row className="s-events-individual-analytics-row">
          <IndividualEventAttendeesAnalytics />
          <IndividualEventGuestsAnalytics />
        </Row>
      </MainSection>
    </div>
  );
};

export default IndividualEventAnalytics;
