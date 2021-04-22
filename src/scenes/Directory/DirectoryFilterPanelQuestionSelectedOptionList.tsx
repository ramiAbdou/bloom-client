import React from 'react';

import { gql, useReactiveVar } from '@apollo/client';
import Attribute from '@components/atoms/Tag/Attribute';
import Row from '@components/containers/Row/Row';
import { IQuestion } from '@core/db/db.entities';
import { ComponentWithFragments } from '@util/constants';
import {
  directoryFilterOpenQuestionIdVar,
  DirectoryFilterSelectedValue,
  DirectoryFilterSelectedValuesVar
} from './Directory.reactive';

const DirectoryFilterPanelQuestionSelectedOptionList: ComponentWithFragments<IQuestion> = ({
  data: question
}) => {
  const isOpen: boolean =
    useReactiveVar(directoryFilterOpenQuestionIdVar) === question.id;

  const values: DirectoryFilterSelectedValue[] = DirectoryFilterSelectedValuesVar().filter(
    (value: DirectoryFilterSelectedValue) =>
      value.questionId === question.id
  );

  if (isOpen || !values?.length) {
    return null;
  }

  return (
    <Row wrap className="mt-xs" gap="xxs">
      {values.map((value: DirectoryFilterSelectedValue) => (
        <Attribute key={value.value}>{value.value}</Attribute>
      ))}
    </Row>
  );
};

DirectoryFilterPanelQuestionSelectedOptionList.fragments = {
  data: gql`
    fragment DirectoryFilterPanelQuestionSelectedOptionListFragment on questions {
      id
    }
  `
};

export default DirectoryFilterPanelQuestionSelectedOptionList;
