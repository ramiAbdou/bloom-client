import React from 'react';

import { gql, useReactiveVar } from '@apollo/client';
import Show from '@components/containers/Show';
import { ComponentWithFragments } from '@util/constants';
import { IQuestion } from '@util/constants.entities';
import { directoryFilterOpenQuestionIdVar } from './Directory.reactive';
import DirectoryFilterPanelQuestionOption from './DirectoryFilterPanelQuestionOption';

const DirectoryFilterPanelQuestionOptionList: ComponentWithFragments<IQuestion> = ({
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
          <DirectoryFilterPanelQuestionOption data={question} i={i} />
        ))}
      </ul>
    </Show>
  );
};

DirectoryFilterPanelQuestionOptionList.fragment = gql`
  fragment DirectoryFilterPanelQuestionOptionListFragment on questions {
    options
    ...DirectoryFilterPanelQuestionOptionFragment
  }
  ${DirectoryFilterPanelQuestionOption.fragment}
`;

export default DirectoryFilterPanelQuestionOptionList;
