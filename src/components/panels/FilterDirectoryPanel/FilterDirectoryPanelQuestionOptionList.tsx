import React from 'react';

import { gql, useReactiveVar } from '@apollo/client';
import Show from '@components/containers/Show';
import { directoryFilterOpenQuestionIdVar } from '@scenes/Directory/Directory.reactive';
import { ComponentWithFragments } from '@util/constants';
import { IQuestion } from '@util/constants.entities';
import FilterDirectoryPanelQuestionOption from './FilterDirectoryPanelQuestionOption';

const FilterDirectoryPanelQuestionOptionList: ComponentWithFragments<IQuestion> = ({
  data: question
}) => {
  const isOpen: boolean =
    useReactiveVar(directoryFilterOpenQuestionIdVar) === question.id;

  return (
    <Show show={!!isOpen}>
      <ul className="mt-sm s-directory-filter-question-option-list">
        {question.options.map((_: string, i: number) => (
          <FilterDirectoryPanelQuestionOption
            key={question.id}
            data={question}
            i={i}
          />
        ))}
      </ul>
    </Show>
  );
};

FilterDirectoryPanelQuestionOptionList.fragment = gql`
  fragment FilterDirectoryPanelQuestionOptionListFragment on questions {
    options
    ...FilterDirectoryPanelQuestionOptionFragment
  }
  ${FilterDirectoryPanelQuestionOption.fragment}
`;

export default FilterDirectoryPanelQuestionOptionList;
