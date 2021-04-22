import React from 'react';

import { gql, useReactiveVar } from '@apollo/client';
import { ComponentWithFragments } from '@util/constants';
import { IQuestion } from '@util/constants.entities';
import { cx } from '@util/util';
import { directoryFilterOpenQuestionIdVar } from './Directory.reactive';
import DirectoryFilterPanelQuestionHeader from './DirectoryFilterPanelQuestionHeader';
import DirectoryFilterPanelQuestionOptionList from './DirectoryFilterPanelQuestionOptionList';
import DirectoryFilterPanelQuestionSelectedOptionList from './DirectoryFilterPanelQuestionSelectedOptionList';

const DirectoryFilterPanelQuestion: ComponentWithFragments<IQuestion> = ({
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
      <DirectoryFilterPanelQuestionHeader data={question} />
      <DirectoryFilterPanelQuestionSelectedOptionList data={question} />
      <DirectoryFilterPanelQuestionOptionList data={question} />
    </div>
  );
};

DirectoryFilterPanelQuestion.fragments = {
  data: gql`
    fragment DirectoryFilterPanelQuestionFragment on questions {
      id
      ...DirectoryFilterPanelQuestionHeaderFragment
      ...DirectoryFilterPanelQuestionOptionListFragment
      ...DirectoryFilterPanelQuestionSelectedOptionListFragment
    }
    ${DirectoryFilterPanelQuestionHeader.fragments.data}
    ${DirectoryFilterPanelQuestionOptionList.fragments.data}
    ${DirectoryFilterPanelQuestionSelectedOptionList.fragments.data}
  `
};

export default DirectoryFilterPanelQuestion;
