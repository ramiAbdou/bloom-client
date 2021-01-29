import React from 'react';

import Separator from '@atoms/Separator';
import AnalyticsCard from '@containers/Card/AnalyticsCard';
import Row from '@containers/Row/Row';
import { useStoreState } from '@store/Store';

const IndividualEventInsights: React.FC = () => {
  const isAdmin = useStoreState(({ db }) => !!db.member?.role);

  if (!isAdmin) return null;

  return (
    <>
      <Row spacing="sm">
        <AnalyticsCard label="# of Attendees" value={14} />
        <AnalyticsCard label="# of RSVPs" value={28} />
      </Row>

      <Separator margin={24} />
    </>
  );
};

export default IndividualEventInsights;
