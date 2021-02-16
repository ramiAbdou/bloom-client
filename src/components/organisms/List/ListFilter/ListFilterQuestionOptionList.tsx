import React from 'react';

import Checkbox from '@atoms/Checkbox/Checkbox';
import { ValueProps } from '@constants';
import { IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
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

const ListFilterQuestionOptionList: React.FC = () => {
  const questionId: string = IdStore.useStoreState((store) => store.id);
  const isOpen = ListFilterQuestionStore.useStoreState((state) => state.isOpen);

  const options: string[] = useStoreState(({ db }) => {
    const question: IQuestion = db.byQuestionId[questionId];
    return question?.options;
  });

  if (!isOpen) return null;

  return (
    <ul className="my-xs">
      {options.map((option: string) => {
        return <ListFilterQuestionOption value={option} />;
      })}
    </ul>
  );
};

export default ListFilterQuestionOptionList;
