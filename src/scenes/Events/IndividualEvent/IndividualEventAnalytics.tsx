import React from 'react';

import Separator from '@atoms/Separator';
import MainSection from '@containers/Main/MainSection';
import Row from '@containers/Row/Row';
import useQuery from '@hooks/useQuery';
import Chart from '@organisms/Chart/Chart';
import { ChartType } from '@organisms/Chart/Chart.types';
import { IEvent } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreState } from '@store/Store';
import { GET_EVENT_GUESTS_SERIES, GetEventArgs } from '../Events.gql';

const IndividualEventAnalytics: React.FC = () => {
  const eventId = useStoreState(({ db }) => db.event?.id);
  const guestsSeries = useStoreState(({ db }) => db.event?.guestsSeries);
  const isAdmin = useStoreState(({ db }) => !!db.member.role);

  const { loading } = useQuery<IEvent, GetEventArgs>({
    name: 'getEvent',
    query: GET_EVENT_GUESTS_SERIES,
    schema: Schema.EVENT,
    variables: { eventId }
  });

  // If not admin or no RSVP's have been collected, don't show!
  if (!isAdmin || guestsSeries?.every(({ value }) => !value)) return null;

  return (
    <div className="s-events-individual-analytics">
      <Separator marginBottom={36} marginTop={0} />

      <MainSection loading={loading} title="Event Analytics">
        <Row className="s-events-individual-analytics-row">
          <Chart
            data={guestsSeries}
            interval={2}
            options={{
              format: 'HOUR',
              xAxis: { interval: 'preserveStartEnd' },
              yAxis: { domain: [0, (dataMax: number) => dataMax + 5] }
            }}
            show={!loading}
            title="RSVP's Collected"
            type={ChartType.TIME_SERIES}
          />
        </Row>
      </MainSection>
    </div>
  );
};

export default IndividualEventAnalytics;
