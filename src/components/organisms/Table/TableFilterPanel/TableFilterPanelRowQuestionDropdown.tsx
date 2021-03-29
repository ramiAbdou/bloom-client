import React, { useEffect, useState } from 'react';

import Dropdown from '@molecules/Dropdown/Dropdown';
import { IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';
import { sortObjects } from '@util/util';
import TableFilterStore from './TableFilterPanel.store';
import {
  TableFilterArgs,
  TableFilterOperatorType
} from './TableFilterPanel.types';

const TableFilterPanelRowQuestionDropdown: React.FC = () => {
  const filterId: string = IdStore.useStoreState((state) => state.id);

  const columnId: string = TableFilterStore.useStoreState((state) => {
    const tableFilter: TableFilterArgs = state.filters[filterId];
    return tableFilter?.columnId;
  });

  const [questionId, setQuestionId] = useState<string>(columnId);

  const defaultQuestionId: string = useStoreState(
    ({ db }) =>
      db.community.questions
        ?.map((entityId: string) => db.byQuestionId[entityId])
        ?.sort((a: IQuestion, b: IQuestion) => sortObjects(a, b, 'rank', 'ASC'))
        ?.filter(
          (question: IQuestion) =>
            ![
              QuestionCategory.FIRST_NAME,
              QuestionCategory.LAST_NAME,
              QuestionCategory.EMAIL,
              QuestionCategory.JOINED_AT
            ].includes(question.category)
        )[0]?.id
  );

  const questions: IQuestion[] = useStoreState(({ db }) =>
    db.community.questions
      ?.map((entityId: string) => db.byQuestionId[entityId])
      ?.sort((a: IQuestion, b: IQuestion) => sortObjects(a, b, 'rank', 'ASC'))
      ?.filter(
        (question: IQuestion) =>
          ![
            QuestionCategory.FIRST_NAME,
            QuestionCategory.LAST_NAME,
            QuestionCategory.EMAIL,
            QuestionCategory.JOINED_AT
          ].includes(question.category)
      )
  );

  const setFilter = TableFilterStore.useStoreActions(
    (state) => state.setFilter
  );

  useEffect(() => {
    if (!questionId && defaultQuestionId) {
      setQuestionId(defaultQuestionId);
      setFilter({ columnId: defaultQuestionId, id: filterId });
    } else if (columnId !== questionId) setQuestionId(columnId);
  }, [columnId, defaultQuestionId]);

  const onQuestionUpdate = (result: string) => {
    const updatedColumnId = questions.find(
      (question) => question.title === result
    )?.id;

    setFilter({
      columnId: updatedColumnId,
      id: filterId,
      operator: TableFilterOperatorType.IS,
      value: null
    });

    setQuestionId(updatedColumnId);
  };

  return (
    <Dropdown
      options={{ attribute: false }}
      value={
        questions?.find((question: IQuestion) => question.id === questionId)
          ?.title
      }
      values={questions?.map(({ title }) => title)}
      onSelect={onQuestionUpdate}
    />
  );
};

export default TableFilterPanelRowQuestionDropdown;
