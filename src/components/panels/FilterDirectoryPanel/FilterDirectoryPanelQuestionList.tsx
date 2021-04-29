import React from 'react';

import { DocumentNode, gql, useQuery } from '@apollo/client';
import { IQuestion } from '@util/constants.entities';
import FilterDirectoryPanelQuestion from './FilterDirectoryPanelQuestion';

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
      ...FilterDirectoryPanelQuestionFragment
    }
  }
  ${FilterDirectoryPanelQuestion.fragment}
`;

const FilterDirectoryPanelQuestionList: React.FC = () => {
  const { data, loading } = useQuery<GetQuestionsByCommunityIdResult>(
    GET_QUESTIONS_BY_COMMUNITY_ID
  );

  if (loading) return null;

  const questions: IQuestion[] = data?.questions ?? [];

  return (
    <ul>
      {questions?.map((question: IQuestion) => (
        <FilterDirectoryPanelQuestion key={question.id} data={question} />
      ))}
    </ul>
  );
};

export default FilterDirectoryPanelQuestionList;
