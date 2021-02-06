import deepequal from 'fast-deep-equal';
import React, { useEffect, useState } from 'react';

import Input from '@atoms/Input/Input';
import { IdProps } from '@constants';
import Row from '@containers/Row/Row';
import Dropdown from '@molecules/Dropdown/Dropdown';
import { IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { TableFilterArgs, TableFilterOperator } from '../Table.types';
import TableFilterStore from './TableFilter.store';

const TableFilterRow: React.FC<IdProps> = ({ id }) => {
  const {
    columnId,
    value: storedValue
  }: TableFilterArgs = TableFilterStore.useStoreState(
    (store) => store.filters[id] ?? {},
    deepequal
  );

  const [questionId, setQuestionId] = useState<string>(columnId ?? null);

  const qId: string = useStoreState(({ db }) => {
    if (!db.community.questions) return null;
    return db.community.questions[0];
  });

  const questions: IQuestion[] = useStoreState(({ db }) => {
    return db.community.questions?.map((entityId: string) => {
      return db.byQuestionId[entityId];
    });
  });

  const setFilter = TableFilterStore.useStoreActions(
    (store) => store.setFilter
  );

  useEffect(() => {
    if (!questionId && qId) setQuestionId(qId);
    else if (columnId !== questionId) setQuestionId(columnId);
  }, [columnId, qId]);

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

  const onInputChange = (value: string) => setFilter({ id, value });

  return (
    <Row className="mb-sm" spacing="sm">
      <h5>Where</h5>

      <Row spacing="xs">
        <Dropdown
          options={questions?.map(({ title }) => title)}
          value={[
            questions?.find((question) => question.id === questionId)?.title
          ]}
          onUpdate={onQuestionUpdate}
        />

        <Dropdown
          options={['is', 'is not']}
          value={['is']}
          onUpdate={onOperatorUpdate}
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
