import React from 'react';

import Checkbox from '@atoms/Checkbox/Checkbox';
import { IMemberValue, IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { ValueProps } from '@util/constants';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionStore from './ListFilterQuestion.store';

const ListFilterQuestionOption: React.FC<ValueProps> = ({ value: option }) => {
  const questionId: string = IdStore.useStoreState((state) => {
    return state.id;
  });

  const addValue = ListFilterQuestionStore.useStoreActions((state) => {
    return state.addValue;
  });

  const removeValue = ListFilterQuestionStore.useStoreActions((state) => {
    return state.removeValue;
  });

  const numResponses: number = useStoreState(({ db }) => {
    const question: IQuestion = db.byQuestionId[questionId];

    return question?.values
      ?.map((valueId: string) => {
        return db.byValuesId[valueId];
      })
      ?.filter((data: IMemberValue) => {
        return data?.value === option;
      })?.length;
  });

  const setFilter = ListFilterStore.useStoreActions((state) => {
    return state.setFilter;
  });

  const values = ListFilterQuestionStore.useStoreState((state) => {
    return state.values;
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      addValue(option);
      setFilter({ questionId, value: [...values, option] });
      return;
    }

    setFilter({
      questionId,
      value: [...values].filter((value: string) => {
        return value !== option;
      })
    });

    removeValue(option);
  };

  return (
    <Checkbox
      key={option}
      checked={values.includes(option)}
      format={(value: string) => {
        return `${value} (${numResponses})`;
      }}
      title={option}
      onChange={onChange}
    />
  );
};

export default ListFilterQuestionOption;
