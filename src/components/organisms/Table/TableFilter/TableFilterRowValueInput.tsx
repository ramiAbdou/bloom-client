import deepequal from 'fast-deep-equal';
import React from 'react';

import Input from '@atoms/Input/Input';
import Dropdown from '@molecules/Dropdown/Dropdown';
import { IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { QuestionType } from '@util/constants';
import TableFilterStore from './TableFilter.store';

const TableFilterRowValueInput: React.FC = () => {
  const id: string = IdStore.useStoreState((state) => {
    return state.id;
  });

  const columnId: string = TableFilterStore.useStoreState((store) => {
    return store.filters[id]?.columnId;
  });

  const question: IQuestion = useStoreState(({ db }) => {
    return db.byQuestionId[columnId];
  }, deepequal);

  const storedValue: any = TableFilterStore.useStoreState((store) => {
    return store.filters[id]?.value;
  });

  const setFilter = TableFilterStore.useStoreActions((store) => {
    return store.setFilter;
  });

  const onInputChange = (value: string) => {
    return setFilter({ id, value });
  };

  if (
    [QuestionType.MULTIPLE_SELECT, QuestionType.MULTIPLE_CHOICE].includes(
      question?.type
    )
  ) {
    return (
      <Dropdown
        options={{ attribute: false }}
        value={question?.options?.find((option) => {
          return option === storedValue;
        })}
        values={question?.options}
        onSelect={onInputChange}
      />
    );
  }

  return (
    <Input
      placeholder="Value..."
      value={storedValue}
      onChange={onInputChange}
    />
  );
};

export default TableFilterRowValueInput;
