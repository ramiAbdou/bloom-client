import React from 'react';

import { gql, useReactiveVar } from '@apollo/client';
import Attribute from '@components/atoms/Tag/Attribute';
import Row from '@components/containers/Row/Row';
import {
  directoryFilterOpenQuestionIdVar,
  DirectoryFilterSelectedValue,
  directoryFilterSelectedValuesVar
} from '@scenes/Directory/Directory.reactive';
import { ComponentWithFragments } from '@util/constants';
import { IQuestion } from '@util/constants.entities';

const FilterDirectoryPanelQuestionSelectedOptionList: ComponentWithFragments<IQuestion> = ({
  data: question
}) => {
  const isOpen: boolean =
    useReactiveVar(directoryFilterOpenQuestionIdVar) === question.id;

  const values: DirectoryFilterSelectedValue[] = useReactiveVar(
    directoryFilterSelectedValuesVar
  );

  const filteredValues: DirectoryFilterSelectedValue[] = values.filter(
    (value: DirectoryFilterSelectedValue) => value.questionId === question.id
  );

  if (isOpen || !filteredValues?.length) {
    return null;
  }

  return (
    <Row wrap className="mt-xs" gap="xxs">
      {filteredValues.map((value: DirectoryFilterSelectedValue) => (
        <Attribute key={value.value}>{value.value}</Attribute>
      ))}
    </Row>
  );
};

FilterDirectoryPanelQuestionSelectedOptionList.fragment = gql`
  fragment FilterDirectoryPanelQuestionSelectedOptionListFragment on questions {
    id
  }
`;

export default FilterDirectoryPanelQuestionSelectedOptionList;
