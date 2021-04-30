import React from 'react';

import { gql } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import { ComponentWithFragments } from '@util/constants';
import { IEvent } from '@util/constants.entities';
import IndividualEventInteractionsTableFilterRow from './IndividualEventInteractionsTableFilterRow';
import IndividualEventInteractionsTableSearchBar from './IndividualEventInteractionsTableSearchBar';

const IndividualEventInteractionsTableActionRow: ComponentWithFragments<IEvent> = ({
  data: event
}) => (
  <Row wrap align="start" gap="sm" style={{ marginBottom: 0 }}>
    <IndividualEventInteractionsTableSearchBar />
    <IndividualEventInteractionsTableFilterRow data={event} />
  </Row>
);

IndividualEventInteractionsTableActionRow.fragment = gql`
  fragment IndividualEventInteractionsTableActionRowFragment on events {
    ...IndividualEventInteractionsTableFilterRowFragment
  }
  ${IndividualEventInteractionsTableFilterRow.fragment}
`;

export default IndividualEventInteractionsTableActionRow;
