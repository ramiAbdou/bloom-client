import deepequal from 'fast-deep-equal';
import React, { useEffect, useState } from 'react';

import Input from '@atoms/Input/Input';
import { IdProps } from '@constants';
import Row from '@containers/Row/Row';
import Dropdown from '@molecules/Dropdown/Dropdown';
import { IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import {
  TableFilterArgs,
  TableFilterJoinOperator,
  TableFilterOperator
} from '../Table.types';
import TableFilterStore from './TableFilter.store';

const TableFilterRow: React.FC<IdProps> = ({ id }) => {
  const {
    columnId,
    value: storedValue
  }: TableFilterArgs = TableFilterStore.useStoreState(
    (store) => store.filters[id] ?? {},
    deepequal
  );

  const rowIndex: number = TableFilterStore.useStoreState((state) => {
    return state.filterIds.findIndex((filterId) => filterId === id);
  });

  const joinOperator = TableFilterStore.useStoreState(
    (store) => store.joinOperator
  );

  const [questionId, setQuestionId] = useState<string>(columnId);

  const defaultQuestionId: string = useStoreState(({ db }) => {
    return db.community.questions
      ?.map((entityId: string) => db.byQuestionId[entityId])
      ?.filter((question: IQuestion) => {
        return !['FIRST_NAME', 'LAST_NAME', 'EMAIL', 'JOINED_AT'].includes(
          question.category
        );
      })[0]?.id;
  });

  const questions: IQuestion[] = useStoreState(({ db }) => {
    return db.community.questions
      ?.map((entityId: string) => db.byQuestionId[entityId])
      ?.filter((question: IQuestion) => {
        return !['FIRST_NAME', 'LAST_NAME', 'EMAIL', 'JOINED_AT'].includes(
          question.category
        );
      });
  });

  const setFilter = TableFilterStore.useStoreActions(
    (store) => store.setFilter
  );

  const setJoinOperator = TableFilterStore.useStoreActions(
    (store) => store.setJoinOperator
  );

  useEffect(() => {
    if (!questionId && defaultQuestionId) setQuestionId(defaultQuestionId);
    else if (columnId !== questionId) setQuestionId(columnId);
  }, [columnId, defaultQuestionId]);

  const onQuestionUpdate = (result: string[]) => {
    const title = result[0];

    const updatedColumnId = questions.find(
      (question) => question.title === title
    )?.id;

    setFilter({ columnId: updatedColumnId, id });
    setQuestionId(updatedColumnId);
  };

  const onOperatorUpdate = (result: string[]) => {
    const operator = result[0] as TableFilterOperator;
    setFilter({ id, operator });
  };

  const onJoinOperatorUpdate = (result: string[]) => {
    const operator = result[0];
    setJoinOperator(operator as TableFilterJoinOperator);
  };

  const onInputChange = (value: string) => setFilter({ id, value });

  return (
    <Row className="o-table-filter-row mb-md" spacing="sm">
      {rowIndex === 0 && <h5>Where</h5>}
      {rowIndex === 1 && (
        <Dropdown
          value={
            joinOperator.charAt(0) + joinOperator.substring(1).toLowerCase()
          }
          values={['And', 'Or']}
          onSelect={onJoinOperatorUpdate}
        />
      )}
      {rowIndex >= 2 && <h5>{joinOperator}</h5>}

      <Row spacing="xs">
        <Dropdown
          value={
            questions?.find((question) => question.id === questionId)?.title
          }
          values={questions?.map(({ title }) => title)}
          onSelect={onQuestionUpdate}
        />

        <Dropdown
          value={['is']}
          values={['is', 'is not']}
          onSelect={onOperatorUpdate}
        />

        <Input
          placeholder="Value..."
          value={storedValue}
          onChange={onInputChange}
        />
      </Row>
    </Row>
  );
};

export default TableFilterRow;
