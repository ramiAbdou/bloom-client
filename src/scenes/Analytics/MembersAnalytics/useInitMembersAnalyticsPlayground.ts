import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';

import { ICommunity, IQuestion } from '@core/db/db.entities';
import IdStore from '@core/store/Id.store';
import { useStoreState } from '@core/store/Store';
import useFindOne from '@gql/hooks/useFindOne';
import { QuestionCategory } from '@util/constants';

// Responsible for populating the initial question in the Data Playground.
const useInitMembersAnalyticsPlayground = (): void => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { data: community } = useFindOne(ICommunity, {
    fields: ['memberTypes.id', 'questions.category', 'questions.id'],
    where: { id: communityId }
  });

  const initialQuestionId: string = community.questions?.find(
    (question: IQuestion) => {
      const isMemberTypeAllowed: boolean =
        question.category === QuestionCategory.MEMBER_TYPE &&
        community.memberTypes.length >= 2;

      return (
        isMemberTypeAllowed ||
        !question.category ||
        question.category === QuestionCategory.EVENTS_ATTENDED ||
        question.category === QuestionCategory.GENDER
      );
    }
  )?.id;

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
