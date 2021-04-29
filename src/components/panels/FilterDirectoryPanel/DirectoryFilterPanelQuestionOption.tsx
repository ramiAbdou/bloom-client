import React from 'react';

import { gql, useReactiveVar } from '@apollo/client';
import Checkbox from '@components/atoms/Checkbox/Checkbox';
import {
  DirectoryFilterSelectedValue,
  directoryFilterSelectedValuesVar
} from '@scenes/Directory/Directory.reactive';
import { ComponentWithFragments } from '@util/constants';
import { IMemberValue, IQuestion } from '@util/constants.entities';

interface DirectoryFilterPanelQuestionOptionProps {
  i: number;
}

const DirectoryFilterPanelQuestionOption: ComponentWithFragments<
  IQuestion,
  DirectoryFilterPanelQuestionOptionProps
> = ({ data: question, i }) => {
  const option: string = question.options[i];

  const selectedValues: DirectoryFilterSelectedValue[] = useReactiveVar(
    directoryFilterSelectedValuesVar
  );

  const responsesCount: number = question.memberValues.filter(
    (memberValue: IMemberValue) => memberValue?.value === option
  )?.length;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      directoryFilterSelectedValuesVar([
        ...selectedValues,
        { questionId: question.id, value: option }
      ]);

      return;
      // setFilter({ questionId, value: [...values, option] });
    }

    directoryFilterSelectedValuesVar(
      selectedValues.filter(
        (value: DirectoryFilterSelectedValue) => value.value !== option
      )
    );

    // setFilter({
    //   questionId,
    //   value: [...values].filter((value: string) => value !== option)
    // });
  };

  return (
    <Checkbox
      key={option}
      checked={selectedValues.map((value) => value.value).includes(option)}
      format={(value: string) => `${value} (${responsesCount})`}
      title={option}
      onChange={onChange}
    />
  );
};

DirectoryFilterPanelQuestionOption.fragment = gql`
  fragment DirectoryFilterPanelQuestionOptionFragment on questions {
    memberValues {
      id
      value
    }
  }
`;

export default DirectoryFilterPanelQuestionOption;
