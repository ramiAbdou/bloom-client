import React from 'react';

import Checkbox from '@components/atoms/Checkbox/Checkbox';
import { IMemberValue, IQuestion } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import IdStore from '@store/Id.store';
import { ValueProps } from '@util/constants';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionStore from './ListFilterQuestion.store';

const ListFilterQuestionOption: React.FC<ValueProps> = ({ value: option }) => {
  const questionId: string = IdStore.useStoreState((state) => state.id);

  const addValue = ListFilterQuestionStore.useStoreActions(
    (state) => state.addValue
  );

  const removeValue = ListFilterQuestionStore.useStoreActions(
    (state) => state.removeValue
  );

  const { memberValues } = useFindOne(IQuestion, {
    fields: ['memberValues.id', 'memberValues.value'],
    where: { id: questionId }
  });

  const responsesCount: number = memberValues.filter(
    (memberValue: IMemberValue) => memberValue?.value === option
  )?.length;

  const setFilter = ListFilterStore.useStoreActions((state) => state.setFilter);
  const values = ListFilterQuestionStore.useStoreState((state) => state.values);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addValue(option);
      setFilter({ questionId, value: [...values, option] });
      return;
    }

    setFilter({
      questionId,
      value: [...values].filter((value: string) => value !== option)
    });

    removeValue(option);
  };

  return (
    <Checkbox
      key={option}
      checked={values.includes(option)}
      format={(value: string) => `${value} (${responsesCount})`}
      title={option}
      onChange={onChange}
    />
  );
};

export default ListFilterQuestionOption;
