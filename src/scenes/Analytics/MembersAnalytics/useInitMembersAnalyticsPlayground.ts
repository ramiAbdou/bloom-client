import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';

import { ICommunity, IQuestion } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';

// Responsible for populating the initial question in the Data Playground.
const useInitMembersAnalyticsPlayground = (): void => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const { memberTypes, questions } = useFindOne(ICommunity, {
    fields: ['memberTypes.id', 'questions.category', 'questions.id'],
    where: { communityId }
  });

  const initialQuestionId: string = questions.find((question: IQuestion) => {
    const isMemberTypeAllowed: boolean =
      question.category === QuestionCategory.MEMBER_TYPE &&
      memberTypes.length >= 2;

    return (
      isMemberTypeAllowed ||
      !question.category ||
      question.category === QuestionCategory.BIO ||
      question.category === QuestionCategory.EVENTS_ATTENDED ||
      question.category === QuestionCategory.GENDER
    );
  })?.id;

  const storedQuestionId: string = IdStore.useStoreState((state) => state.id);

  const setQuestionId: ActionCreator<string> = IdStore.useStoreActions(
    (state) => state.setId
  );

  useEffect(() => {
    if (!storedQuestionId && initialQuestionId !== storedQuestionId) {
      setQuestionId(initialQuestionId);
    }
  }, [storedQuestionId, initialQuestionId]);
};

export default useInitMembersAnalyticsPlayground;
