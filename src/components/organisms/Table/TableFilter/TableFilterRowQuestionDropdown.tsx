import React, { useEffect, useState } from 'react';

import Dropdown from '@molecules/Dropdown/Dropdown';
import { IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import TableFilterStore from './TableFilter.store';

const TableFilterRowQuestionDropdown: React.FC = () => {
  const id: string = IdStore.useStoreState((state) => state.id);

  const columnId: string = TableFilterStore.useStoreState(
    (store) => store.filters[id]?.columnId
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

  useEffect(() => {
    if (!questionId && defaultQuestionId) {
      setQuestionId(defaultQuestionId);
      setFilter({ columnId: defaultQuestionId, id });
    } else if (columnId !== questionId) setQuestionId(columnId);
  }, [columnId, defaultQuestionId]);

  const onQuestionUpdate = (result: string) => {
    const updatedColumnId = questions.find(
      (question) => question.title === result
    )?.id;

    setFilter({ columnId: updatedColumnId, id, operator: 'is', value: null });
    setQuestionId(updatedColumnId);
  };

  return (
    <Dropdown
      options={{ attribute: false }}
      value={questions?.find((question) => question.id === questionId)?.title}
      values={questions?.map(({ title }) => title)}
      onSelect={onQuestionUpdate}
    />
  );
};

export default TableFilterRowQuestionDropdown;