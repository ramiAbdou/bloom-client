import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Input from '@atoms/Input/Input';
import Dropdown from '@molecules/Dropdown/Dropdown';
import { IQuestion } from '@store/Db/Db.entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { QuestionType } from '@util/constants';
import TableFilterStore from './TableFilterPanel.store';
import { TableFilterArgs } from './TableFilterPanel.types';

const TableFilterPanelRowValueInput: React.FC = () => {
  const filterId: string = IdStore.useStoreState((state) => state.id);

  const columnId: string = TableFilterStore.useStoreState((state) => {
    const tableFilter: TableFilterArgs = state.filters[filterId];
    return tableFilter?.columnId;
  });

  const questionType: QuestionType = useStoreState(({ db }) => {
    const question: IQuestion = db.byQuestionId[columnId];
    return question?.type;
  });

  const questionOptions: string[] = useStoreState(({ db }) => {
    const question: IQuestion = db.byQuestionId[columnId];
    return question?.options;
  });

  const storedValue: string = TableFilterStore.useStoreState((state) => {
    const tableFilter: TableFilterArgs = state.filters[filterId];
    return tableFilter?.value;
  });

  const setFilter: ActionCreator<
    Partial<TableFilterArgs>
  > = TableFilterStore.useStoreActions((state) => state.setFilter);

  const onInputChange = (value: string): void => {
    setFilter({ id: filterId, value });
  };

  if (
    questionType === QuestionType.MULTIPLE_CHOICE ||
    questionType === QuestionType.MULTIPLE_SELECT
  ) {
    return (
      <Dropdown
        options={{ attribute: false }}
        value={questionOptions?.find(
          (option: string) => option === storedValue
        )}
        values={questionOptions}
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

export default TableFilterPanelRowValueInput;
