import React from 'react';
import { IoAdd } from 'react-icons/io5';

import { gql, useReactiveVar } from '@apollo/client';
import Row from '@components/containers/Row/Row';
import { ComponentWithFragments } from '@util/constants';
import { IQuestion } from '@util/constants.entities';
import { cx } from '@util/util';
import { directoryFilterOpenQuestionIdVar } from './Directory.reactive';

const DirectoryFilterPanelQuestionHeader: ComponentWithFragments<IQuestion> = ({
  data: question
}) => {
  const isOpen: boolean =
    useReactiveVar(directoryFilterOpenQuestionIdVar) === question.id;

  // const areValuesSelected: boolean = ListFilterQuestionStore.useStoreState(
  //   (state) => !!state.values?.length
  // );

  const css: string = cx('w-100', { 'mb-ss--nlc': false });
  // const css: string = cx('w-100', { 'mb-ss--nlc': areValuesSelected });

  return (
    <Row className={css} justify="sb" spacing="xs">
      <h4 className="overflow-ellipses">{question.title}</h4>
      {!isOpen && <IoAdd />}
    </Row>
  );
};

DirectoryFilterPanelQuestionHeader.fragment = gql`
  fragment DirectoryFilterPanelQuestionHeaderFragment on questions {
    id
    title
  }
`;

export default DirectoryFilterPanelQuestionHeader;
