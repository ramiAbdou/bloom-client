import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import LoadingHeader from '@components/containers/LoadingHeader/LoadingHeader';
import Section from '@components/containers/Section';
import { IQuestion } from '@util/constants.entities';
import MembersAnalyticsPlaygroundChart from './MembersAnalyticsPlaygroundChart';
import MembersAnalyticsPlaygroundDropdown from './MembersAnalyticsPlaygroundDropdown';

interface GetMembersAnalyticsPlaygroundResult {
  question: IQuestion;
  questions: IQuestion[];
}

const GET_MEMBERS_ANALYTICS_PLAYGROUND: DocumentNode = gql`
  query GetMembersAnalyticsPlayground(
    $communityId: String!
    $membersAnalyticsPlaygroundQuestionId: String! = ""
  ) {
    communityId @client @export(as: "communityId")
    membersAnalyticsPlaygroundQuestionId
      @client
      @export(as: "membersAnalyticsPlaygroundQuestionId")

    question(id: $membersAnalyticsPlaygroundQuestionId) {
      id
      ...MembersAnalyticsPlaygroundChartFragment
    }

    questions(
      where: {
        communityId: { _eq: $communityId }
        _or: [
          { category: { _is_null: true } }
          { category: { _eq: "EVENTS_ATTENDED" } }
          { category: { _eq: "GENDER" } }
          { category: { _eq: "MEMBER_TYPE" } }
        ]
        type: { _neq: "LONG_TEXT" }
      }
      order_by: { rank: asc }
    ) {
      id
      ...MembersAnalyticsPlaygroundDropdownFragment
    }
  }
  ${MembersAnalyticsPlaygroundChart.fragment}
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

  const question: IQuestion = data?.question;
  const questions: IQuestion[] = data?.questions;

  console.log(question);

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
        {question && <MembersAnalyticsPlaygroundChart data={question} />}
      </div>
    </Section>
  );
};

export default MembersAnalyticsPlaygroundSection;
