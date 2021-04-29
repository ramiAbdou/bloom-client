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

  // const sortedOptions: string[] = question.options?.sort(
  //   (a: string, b: string) => {
  //     const aNumOptions: number = question.memberValues?.filter(
  //       (memberValue: IMemberValue) => memberValue?.value === a
  //     )?.length;

  //     const bNumOptions: number = question.memberValues?.filter(
  //       (memberValue: IMemberValue) => memberValue?.value === b
  //     )?.length;

  //     if (aNumOptions === bNumOptions) return 0;
  //     return aNumOptions < bNumOptions ? 1 : -1;
  //   }
  // );

  return (
    <Show show={!!isOpen}>
      <ul className="mt-sm s-directory-filter-question-option-list">
        {question.options.map((_: string, i: number) => (
          <FilterDirectoryPanelQuestionOption data={question} i={i} />
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