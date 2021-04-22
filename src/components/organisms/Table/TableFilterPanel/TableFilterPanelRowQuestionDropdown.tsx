import { ActionCreator } from 'easy-peasy';
import React, { useEffect, useState } from 'react';
import { communityIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Dropdown from '@components/molecules/Dropdown/Dropdown';
import IdStore from '@core/store/Id.store';
import useFindOne from '@gql/hooks/useFindOne';
import { QuestionCategory } from '@util/constants';
import { ICommunity, IQuestion } from '@util/constants.entities';
import { sortObjects } from '@util/util';
import TableFilterStore from './TableFilterPanel.store';
import {
  TableFilterArgs,
  TableFilterOperatorType
} from './TableFilterPanel.types';

const TableFilterPanelRowQuestionDropdown: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);
  const filterId: string = IdStore.useStoreState((state) => state.id);

  const columnId: string = TableFilterStore.useStoreState((state) => {
    const tableFilter: TableFilterArgs = state.filters[filterId];
    return tableFilter?.columnId;
  });

  const [questionId, setQuestionId] = useState<string>(columnId);

  const setFilter: ActionCreator<
    Partial<TableFilterArgs>
  > = TableFilterStore.useStoreActions((state) => state.setFilter);

  const { data: community, loading } = useFindOne(ICommunity, {
    fields: ['memberTypes.id', 'questions.category', 'questions.id'],
    where: { id: communityId }
  });

  const initialQuestionId: string = community.questions.find(
    (question: IQuestion) => {
      const isMemberTypeAllowed: boolean =
        question.category === QuestionCategory.MEMBER_TYPE &&
        community.memberTypes.length >= 2;

      return (
        isMemberTypeAllowed ||
        !question.category ||
        question.category === QuestionCategory.BIO ||
        question.category === QuestionCategory.EVENTS_ATTENDED ||
        question.category === QuestionCategory.GENDER
      );
    }
  )?.id;

  const sortedQuestions: IQuestion[] = community.questions
    ?.filter((question: IQuestion) => {
      const isMemberTypeAllowed: boolean =
        question.category === QuestionCategory.MEMBER_TYPE &&
        community.memberTypes.length >= 2;

      return (
        isMemberTypeAllowed ||
        !question.category ||
        question.category === QuestionCategory.BIO ||
        question.category === QuestionCategory.EVENTS_ATTENDED ||
        question.category === QuestionCategory.GENDER
      );
    })
    ?.sort((a: IQuestion, b: IQuestion) => sortObjects(a, b, 'rank', 'ASC'));

  useEffect(() => {
    if (!questionId && initialQuestionId) {
      setQuestionId(initialQuestionId);
      setFilter({ columnId: initialQuestionId, id: filterId });
      return;
    }

    if (columnId !== questionId) setQuestionId(columnId);
  }, [columnId, initialQuestionId]);

  if (loading) return null;

  const onQuestionUpdate = (result: string) => {
    const updatedColumnId = sortedQuestions.find(
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
        sortedQuestions?.find(
          (question: IQuestion) => question.id === questionId
        )?.title
      }
      values={sortedQuestions?.map((question: IQuestion) => question.title)}
      onSelect={onQuestionUpdate}
    />
  );
};

export default TableFilterPanelRowQuestionDropdown;
