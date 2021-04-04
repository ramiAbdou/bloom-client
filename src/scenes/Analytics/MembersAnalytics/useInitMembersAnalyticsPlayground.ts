import { ActionCreator } from 'easy-peasy';
import { useEffect } from 'react';

import { IQuestion } from '@db/db.entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';

// Responsible for populating the initial question in the Data Playground.
const useInitMembersAnalyticsPlayground = (): void => {
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
        question.category === QuestionCategory.GENDER
      );
    });

    return initialQuestion?.id;
  });

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
