import React from 'react';

import { gql, useReactiveVar } from '@apollo/client';
import Checkbox from '@components/atoms/Checkbox/Checkbox';
import { IMemberValue, IQuestion } from '@core/db/db.entities';
import { ComponentWithFragments } from '@util/constants';
import { directoryFilterOpenQuestionSelectedValuesVar } from '../../reactive';

const DirectoryFilterPanelQuestionOption: ComponentWithFragments<IQuestion> = ({
  data: question,
  i
}) => {
  const option: string = question.options[i];

  const selectedValues: string[] = useReactiveVar(
    directoryFilterOpenQuestionSelectedValuesVar
  );

  // const questionId: string = IdStore.useStoreState((state) => state.id);

  // const setFilter = ListFilterStore.useStoreActions((state) => state.setFilter);

  const responsesCount: number = question.memberValues.filter(
    (memberValue: IMemberValue) => memberValue?.value === option
  )?.length;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const previousSelectedValues: string[] = directoryFilterOpenQuestionSelectedValuesVar();

    if (e.target.checked) {
      directoryFilterOpenQuestionSelectedValuesVar([
        ...previousSelectedValues,
        option
      ]);

      return;
      // setFilter({ questionId, value: [...values, option] });
    }

    directoryFilterOpenQuestionSelectedValuesVar(
      previousSelectedValues.filter((value: string) => value !== option)
    );

    // setFilter({
    //   questionId,
    //   value: [...values].filter((value: string) => value !== option)
    // });
  };

  return (
    <Checkbox
      key={option}
      checked={selectedValues.includes(option)}
      format={(value: string) => `${value} (${responsesCount})`}
      title={option}
      onChange={onChange}
    />
  );
};

DirectoryFilterPanelQuestionOption.fragments = {
  data: gql`
    fragment DirectoryFilterPanelQuestionOptionFragment on questions {
      memberValues {
        id
        value
      }
    }
  `
};

export default DirectoryFilterPanelQuestionOption;
