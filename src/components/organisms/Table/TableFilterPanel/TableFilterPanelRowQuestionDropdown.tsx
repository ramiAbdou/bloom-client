import React, { useEffect, useState } from 'react';

import Dropdown from '@molecules/Dropdown/Dropdown';
import { IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';
import { sortObjects } from '@util/util';
import TableFilterStore from './TableFilterPanel.store';
import { TableFilterOperatorType } from './TableFilterPanel.types';

const TableFilterPanelRowQuestionDropdown: React.FC = () => {
  const id: string = IdStore.useStoreState((state) => {
    return state.id;
  });

  const columnId: string = TableFilterStore.useStoreState((store) => {
    return store.filters[id]?.columnId;
  });

  const [questionId, setQuestionId] = useState<string>(columnId);

  const defaultQuestionId: string = useStoreState(({ db }) => {
    return db.community.questions
      ?.map((entityId: string) => {
        return db.byQuestionId[entityId];
      })
      ?.sort((a, b) => {
        return sortObjects(a, b, 'rank', 'ASC');
      })
      ?.filter((question: IQuestion) => {
        return ![
          QuestionCategory.FIRST_NAME,
          QuestionCategory.LAST_NAME,
          QuestionCategory.EMAIL,
          QuestionCategory.JOINED_AT
        ].includes(question.category);
      })[0]?.id;
  });

  const questions: IQuestion[] = useStoreState(({ db }) => {
    return db.community.questions
      ?.map((entityId: string) => {
        return db.byQuestionId[entityId];
      })
      ?.sort((a, b) => {
        return sortObjects(a, b, 'rank', 'ASC');
      })
      ?.filter((question: IQuestion) => {
        return ![
          QuestionCategory.FIRST_NAME,
          QuestionCategory.LAST_NAME,
          QuestionCategory.EMAIL,
          QuestionCategory.JOINED_AT
        ].includes(question.category);
      });
  });

  const setFilter = TableFilterStore.useStoreActions((store) => {
    return store.setFilter;
  });

  useEffect(() => {
    if (!questionId && defaultQuestionId) {
      setQuestionId(defaultQuestionId);
      setFilter({ columnId: defaultQuestionId, id });
    } else if (columnId !== questionId) setQuestionId(columnId);
  }, [columnId, defaultQuestionId]);

  const onQuestionUpdate = (result: string) => {
    const updatedColumnId = questions.find((question) => {
      return question.title === result;
    })?.id;

    setFilter({
      columnId: updatedColumnId,
      id,
      operator: TableFilterOperatorType.IS,
      value: null
    });

    setQuestionId(updatedColumnId);
  };

  return (
    <Dropdown
      options={{ attribute: false }}
      value={
        questions?.find((question) => {
          return question.id === questionId;
        })?.title
      }
      values={questions?.map(({ title }) => {
        return title;
      })}
      onSelect={onQuestionUpdate}
    />
  );
};

export default TableFilterPanelRowQuestionDropdown;
