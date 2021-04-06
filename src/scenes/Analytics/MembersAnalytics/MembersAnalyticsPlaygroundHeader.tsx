import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Show from '@containers/Show';
import { IQuestion } from '@db/db.entities';
import Dropdown from '@molecules/Dropdown/Dropdown';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';
import { sortObjects } from '@util/util';

const MembersAnalyticsPlaygroundDropdown: React.FC = () => {
  // We only want the questions that are meaningful, and things like first/last
  // name aren't very meaningful.
  const questions: IQuestion[] = useStoreState(({ db }) =>
    db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
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
          question.category === QuestionCategory.GENDER
        );
      })
      ?.sort((a: IQuestion, b: IQuestion) => sortObjects(a, b, 'rank', 'ASC'))
  );

  const questionId: string = IdStore.useStoreState((state) => state.id);

  const setQuestionId: ActionCreator<string> = IdStore.useStoreActions(
    (state) => state.setId
  );

  const onSelect = (result: string) => {
    const updatedQuestionId: string = questions.find(
      (question: IQuestion) => question.title === result
    )?.id;

    setQuestionId(updatedQuestionId);
  };

  return (
    <Dropdown
      fit
      className="mb-sm--nlc"
      value={questions?.find(({ id }) => id === questionId)?.title}
      values={questions?.map(({ title }) => title)}
      onSelect={onSelect}
    />
  );
};

const MembersAnalyticsPlaygroundHeader: React.FC = () => {
  const questionId: string = IdStore.useStoreState((state) => state.id);

  return (
    <Show show={!!questionId}>
      <p className="mb-xs--nlc">
        Choose any piece of data that you'd like to explore.
      </p>

      <MembersAnalyticsPlaygroundDropdown />
    </Show>
  );
};

export default MembersAnalyticsPlaygroundHeader;
