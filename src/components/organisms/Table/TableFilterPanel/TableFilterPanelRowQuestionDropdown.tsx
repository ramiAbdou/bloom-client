import { ActionCreator } from 'easy-peasy';
import React, { useEffect, useState } from 'react';

import Dropdown from '@molecules/Dropdown/Dropdown';
import { IQuestion } from '@store/db/Db.entities';
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

  const initialQuestionId: string = useStoreState(({ db }) => {
    const questions: IQuestion[] = db.community.questions?.map(
      (id: string) => db.byQuestionId[id]
    );

    const initialQuestion: IQuestion = questions.find((question: IQuestion) => {
      const isDuesStatusAllowed: boolean =
        question.category === QuestionCategory.DUES_STATUS &&
        db.community.canCollectDues;

      const isMemberTypeAllowed: boolean =
        question.category === QuestionCategory.MEMBER_TYPE &&
        db.community.memberTypes.length >= 2;

      return (
        !question.category ||
        isDuesStatusAllowed ||
        isMemberTypeAllowed ||
        question.category === QuestionCategory.BIO ||
        question.category === QuestionCategory.EVENTS_ATTENDED ||
        question.category === QuestionCategory.GENDER
      );
    });

    return initialQuestion?.id;
  });

  const questions: IQuestion[] = useStoreState(({ db }) =>
    db.community.questions
      ?.map((entityId: string) => db.byQuestionId[entityId])
      ?.filter((question: IQuestion) => {
        const isDuesStatusAllowed: boolean =
          question.category === QuestionCategory.DUES_STATUS &&
          db.community.canCollectDues;

        const isMemberTypeAllowed: boolean =
          question.category === QuestionCategory.MEMBER_TYPE &&
          db.community.memberTypes.length >= 2;

        return (
          !question.category ||
          isDuesStatusAllowed ||
          isMemberTypeAllowed ||
          question.category === QuestionCategory.BIO ||
          question.category === QuestionCategory.EVENTS_ATTENDED ||
          question.category === QuestionCategory.GENDER
        );
      })
      ?.sort((a: IQuestion, b: IQuestion) => sortObjects(a, b, 'rank', 'ASC'))
  );

  const setFilter: ActionCreator<
    Partial<TableFilterArgs>
  > = TableFilterStore.useStoreActions((state) => state.setFilter);

  useEffect(() => {
    if (!questionId && initialQuestionId) {
      setQuestionId(initialQuestionId);
      setFilter({ columnId: initialQuestionId, id: filterId });
      return;
    }

    if (columnId !== questionId) setQuestionId(columnId);
  }, [columnId, initialQuestionId]);

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
      values={questions?.map((question: IQuestion) => question.title)}
      onSelect={onQuestionUpdate}
    />
  );
};

export default TableFilterPanelRowQuestionDropdown;
