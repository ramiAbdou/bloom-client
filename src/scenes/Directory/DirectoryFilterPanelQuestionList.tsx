import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import { IQuestion } from '@util/db.entities';
import DirectoryFilterPanelQuestion from './DirectoryFilterPanelQuestion';

interface GetQuestionsByCommunityIdResult {
  questions: IQuestion[];
}

const GET_QUESTIONS_BY_COMMUNITY_ID: DocumentNode = gql`
  query GetQuestionsByCommunityId($communityId: String!) {
    communityId @client @export(as: "communityId")

    questions(
      where: {
        communityId: { _eq: $communityId }
        locked: { _eq: false }
        type: { _eq: "MULTIPLE_CHOICE" }
      }
      order_by: { rank: asc, createdAt: desc }
    ) {
      ...DirectoryFilterPanelQuestionFragment
    }
  }
  ${DirectoryFilterPanelQuestion.fragments.data}
`;

const DirectoryFilterPanelQuestionList: React.FC = () => {
  const { data, loading } = useQuery<GetQuestionsByCommunityIdResult>(
    GET_QUESTIONS_BY_COMMUNITY_ID
  );

  if (loading) return null;

  const questions: IQuestion[] = data?.questions ?? [];

  return (
    <ul>
      {questions?.map((question: IQuestion) => (
        <DirectoryFilterPanelQuestion key={question.id} data={question} />
      ))}
    </ul>
  );
};

export default DirectoryFilterPanelQuestionList;
