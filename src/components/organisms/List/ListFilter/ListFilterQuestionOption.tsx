import React from 'react';

import Checkbox from '@atoms/Checkbox/Checkbox';
import { ValueProps } from '@constants';
import ListFilterQuestionStore from './ListFilterQuestion.store';

const ListFilterQuestionOption: React.FC<ValueProps> = ({ value: option }) => {
  const addValue = ListFilterQuestionStore.useStoreActions(
    (state) => state.addValue
  );

  const removeValue = ListFilterQuestionStore.useStoreActions(
    (state) => state.removeValue
  );

  const values = ListFilterQuestionStore.useStoreState((state) => state.values);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) addValue(option);
    else removeValue(option);
  };

  return (
    <Checkbox
      key={option}
      checked={values.includes(option)}
      title={option}
      onChange={onChange}
    />
  );
};

export default ListFilterQuestionOption;
