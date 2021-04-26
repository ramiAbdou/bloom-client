import React, { useEffect } from 'react';

import { gql, useReactiveVar } from '@apollo/client';
import Dropdown from '@components/molecules/Dropdown/Dropdown';
import { ComponentWithFragments } from '@util/constants';
import { IQuestion } from '@util/constants.entities';
import { membersAnalyticsPlaygroundQuestionIdVar } from '../Analytics.reactive';

const MembersAnalyticsPlaygroundDropdown: ComponentWithFragments<
  IQuestion[]
> = ({ data: questions }) => {
  useEffect(() => {
    membersAnalyticsPlaygroundQuestionIdVar(questions[0]?.id);
  }, []);

  const questionId: string = useReactiveVar(
    membersAnalyticsPlaygroundQuestionIdVar
  );

  const onSelect = (result: string): void => {
    const updatedQuestion: IQuestion = questions.find(
      (question: IQuestion) => question.title === result
    );

    membersAnalyticsPlaygroundQuestionIdVar(updatedQuestion.id);
  };

  return (
    <Dropdown
      fit
      className="mb-sm--nlc"
      value={questions?.find(({ id }) => id === questionId)?.title}
      values={questions?.map(({ title }) => title)}
      onSelect={onSelect}
    />
  );
};

MembersAnalyticsPlaygroundDropdown.fragment = gql`
  fragment MembersAnalyticsPlaygroundDropdownFragment on questions {
    id
    title
  }
`;

export default MembersAnalyticsPlaygroundDropdown;
