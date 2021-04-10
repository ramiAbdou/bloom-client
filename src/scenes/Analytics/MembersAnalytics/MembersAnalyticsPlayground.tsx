import React from 'react';

import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import Section from '@components/containers/Section';
import Chart from '@components/organisms/Chart/Chart';
import IdStore from '@core/store/Id.store';
import MembersAnalyticsPlaygroundHeader from './MembersAnalyticsPlaygroundHeader';
import useInitMembersAnalyticsPlayground from './useInitMembersAnalyticsPlayground';

const MembersAnalyticsPlaygroundChart: React.FC = () => {
  const questionId: string = IdStore.useStoreState((state) => state.id);
  return <Chart questionId={questionId} />;
};

const MembersAnalyticsPlaygroundContent: React.FC = () => {
  useInitMembersAnalyticsPlayground();

  return (
    <div className="s-analytics-members-playground">
      <MembersAnalyticsPlaygroundHeader />
      <MembersAnalyticsPlaygroundChart />
    </div>
  );
};

/**
 * Only state that is tracked here is the questionId of the question that is
 * currently being displayed.
 */
const MembersAnalyticsPlayground: React.FC = () => (
  <Section>
    <LoadingHeader h2 className="mb-sm" title="Data Playground" />
    <IdStore.Provider>
      <MembersAnalyticsPlaygroundContent />
    </IdStore.Provider>
  </Section>
);

export default MembersAnalyticsPlayground;
