import React from 'react';

import { gql, useReactiveVar } from '@apollo/client';
import { directoryFilterOpenQuestionIdVar } from '@scenes/Directory/Directory.reactive';
import { ComponentWithFragments } from '@util/constants';
import { IQuestion } from '@util/constants.entities';
import { cx } from '@util/util';
import FilterDirectoryPanelQuestionHeader from './FilterDirectoryPanelQuestionHeader';
import FilterDirectoryPanelQuestionOptionList from './FilterDirectoryPanelQuestionOptionList';
import FilterDirectoryPanelQuestionSelectedOptionList from './FilterDirectoryPanelQuestionSelectedOptionList';

const FilterDirectoryPanelQuestion: ComponentWithFragments<IQuestion> = ({
  data: question
}) => {
  const isOpen: boolean =
    useReactiveVar(directoryFilterOpenQuestionIdVar) === question.id;

  const onClick = (): void => {
    const previousValue: string = directoryFilterOpenQuestionIdVar();

    directoryFilterOpenQuestionIdVar(
      previousValue !== question.id ? question.id : null
    );
  };

  const css: string = cx('s-directory-filter-question', {
    's-directory-filter-question--active': isOpen
  });

  return (
    <div className={css} onClick={onClick}>
      <FilterDirectoryPanelQuestionHeader data={question} />
      <FilterDirectoryPanelQuestionSelectedOptionList data={question} />
      <FilterDirectoryPanelQuestionOptionList data={question} />
    </div>
  );
};

FilterDirectoryPanelQuestion.fragment = gql`
  fragment FilterDirectoryPanelQuestionFragment on questions {
    id
    ...FilterDirectoryPanelQuestionHeaderFragment
    ...FilterDirectoryPanelQuestionOptionListFragment
    ...FilterDirectoryPanelQuestionSelectedOptionListFragment
  }
  ${FilterDirectoryPanelQuestionHeader.fragment}
  ${FilterDirectoryPanelQuestionOptionList.fragment}
  ${FilterDirectoryPanelQuestionSelectedOptionList.fragment}
`;

export default FilterDirectoryPanelQuestion;
