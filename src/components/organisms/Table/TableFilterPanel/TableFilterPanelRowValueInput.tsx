import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Input from '@components/atoms/Input/Input';
import { IQuestion } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import Dropdown from '@components/molecules/Dropdown/Dropdown';
import IdStore from '@store/Id.store';
import { QuestionType } from '@util/constants';
import TableFilterStore from './TableFilterPanel.store';
import { TableFilterArgs } from './TableFilterPanel.types';

const TableFilterPanelRowValueInput: React.FC = () => {
  const filterId: string = IdStore.useStoreState((state) => state.id);

  const columnId: string = TableFilterStore.useStoreState((state) => {
    const tableFilter: TableFilterArgs = state.filters[filterId];
    return tableFilter?.columnId;
  });

  const { options, type } = useFindOne(IQuestion, {
    fields: ['options', 'type'],
    where: { id: columnId }
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
    type === QuestionType.MULTIPLE_CHOICE ||
    type === QuestionType.MULTIPLE_SELECT
  ) {
    return (
      <Dropdown
        options={{ attribute: false }}
        value={options?.find((option: string) => option === storedValue)}
        values={options}
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
