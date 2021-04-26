import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import Section from '@components/containers/Section';
import { IQuestion } from '@util/constants.entities';
import MembersAnalyticsPlaygroundChart from './MembersAnalyticsPlaygroundChart';
import MembersAnalyticsPlaygroundDropdown from './MembersAnalyticsPlaygroundDropdown';

interface GetMembersAnalyticsPlaygroundResult {
  questions: IQuestion[];
}

const GET_MEMBERS_ANALYTICS_PLAYGROUND: DocumentNode = gql`
  query GetMembersAnalyticsPlayground($communityId: String!) {
    communityId @client @export(as: "communityId")

    questions(
      where: {
        communityId: { _eq: $communityId }
        _or: [
          { category: { _is_null: true } }
          { category: { _eq: "EVENTS_ATTENDED" } }
          { category: { _eq: "GENDER" } }
          { category: { _eq: "MEMBER_TYPE" } }
        ]
      }
      order_by: { rank: asc }
    ) {
      id
      ...MembersAnalyticsPlaygroundDropdownFragment
    }
  }
  ${MembersAnalyticsPlaygroundDropdown.fragment}
`;

const MembersAnalyticsPlaygroundDescription: React.FC = () => (
  <p className="mb-xs--nlc">
    Choose any piece of data that you'd like to explore.
  </p>
);

/**
 * Only state that is tracked here is the questionId of the question that is
 * currently being displayed.
 */
const MembersAnalyticsPlaygroundSection: React.FC = () => {
  const { data, loading } = useQuery<GetMembersAnalyticsPlaygroundResult>(
    GET_MEMBERS_ANALYTICS_PLAYGROUND
  );

  const questions: IQuestion[] = data?.questions;

  return (
    <Section>
      <LoadingHeader
        h2
        className="mb-sm"
        loading={loading}
        title="Data Playground"
      />

      <div className="s-analytics-members-playground">
        <MembersAnalyticsPlaygroundDescription />
        {questions && <MembersAnalyticsPlaygroundDropdown data={questions} />}
        <MembersAnalyticsPlaygroundChart />
      </div>
    </Section>
  );
};

export default MembersAnalyticsPlaygroundSection;
