import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Input from '@components/atoms/Input/Input';
import Dropdown from '@components/molecules/Dropdown/Dropdown';
import { IQuestion } from '@util/db.entities';
import IdStore from '@core/store/Id.store';
import useFindOne from '@gql/hooks/useFindOne';
import { QuestionType } from '@util/constants';
import TableFilterStore from './TableFilterPanel.store';
import { TableFilterArgs } from './TableFilterPanel.types';

const TableFilterPanelRowValueInput: React.FC = () => {
  const filterId: string = IdStore.useStoreState((state) => state.id);

  const columnId: string = TableFilterStore.useStoreState((state) => {
    const tableFilter: TableFilterArgs = state.filters[filterId];
    return tableFilter?.columnId;
  });

  const storedValue: string = TableFilterStore.useStoreState((state) => {
    const tableFilter: TableFilterArgs = state.filters[filterId];
    return tableFilter?.value;
  });

  const setFilter: ActionCreator<
    Partial<TableFilterArgs>
  > = TableFilterStore.useStoreActions((state) => state.setFilter);

  const { data: question, loading } = useFindOne(IQuestion, {
    fields: ['options', 'type'],
    where: { id: columnId }
  });

  if (loading) return null;

  const onInputChange = (value: string): void => {
    setFilter({ id: filterId, value });
  };

  if (
    question.type === QuestionType.MULTIPLE_CHOICE ||
    question.type === QuestionType.MULTIPLE_SELECT
  ) {
    return (
      <Dropdown
        options={{ attribute: false }}
        value={question.options?.find(
          (option: string) => option === storedValue
        )}
        values={question.options}
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
