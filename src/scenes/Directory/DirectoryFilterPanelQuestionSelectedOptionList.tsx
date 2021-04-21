import React from 'react';
import {
  directoryFilterOpenQuestionIdVar,
  directoryFilterOpenQuestionSelectedValuesVar
} from 'src/reactive';

import { gql, useReactiveVar } from '@apollo/client';
import Attribute from '@components/atoms/Tag/Attribute';
import Row from '@components/containers/Row/Row';
import { IQuestion } from '@core/db/db.entities';
import { ComponentWithFragments } from '@util/constants';

const DirectoryFilterPanelQuestionSelectedOptionList: ComponentWithFragments<IQuestion> = ({
  data: question
}) => {
  const isOpen: boolean =
    useReactiveVar(directoryFilterOpenQuestionIdVar) === question.id;

  const values: string[] = directoryFilterOpenQuestionSelectedValuesVar();

  if (isOpen || !values?.length) return null;

  return (
    <Row wrap className="mt-xs" gap="xxs">
      {values.map((value: string) => (
        <Attribute>{value}</Attribute>
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
