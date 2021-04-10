import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Show from '@components/containers/Show';
import Dropdown from '@components/molecules/Dropdown/Dropdown';
import { IMemberType, IQuestion } from '@core/db/db.entities';
import useFindFull from '@core/gql/hooks/useFindFull';
import IdStore from '@core/store/Id.store';
import { useStoreState } from '@core/store/Store';
import { QuestionCategory } from '@util/constants';
import { sortObjects } from '@util/util';

const MembersAnalyticsPlaygroundDropdown: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);
  const questionId: string = IdStore.useStoreState((state) => state.id);

  const setQuestionId: ActionCreator<string> = IdStore.useStoreActions(
    (state) => state.setId
  );

  const { data: memberTypes, loading: loading1 } = useFindFull(IMemberType, {
    where: { communityId }
  });

  const { data: questions, loading: loading2 } = useFindFull(IQuestion, {
    fields: ['category', 'rank', 'title'],
    where: { communityId }
  });

  if (loading1 || loading2) return null;

  const filteredQuestions: IQuestion[] = questions
    ?.filter((question: IQuestion) => {
      const isMemberTypeAllowed: boolean =
        question.category === QuestionCategory.MEMBER_TYPE &&
        memberTypes.length >= 2;

      return (
        isMemberTypeAllowed ||
        !question.category ||
        question.category === QuestionCategory.EVENTS_ATTENDED ||
        question.category === QuestionCategory.GENDER
      );
    })
    ?.sort((a: IQuestion, b: IQuestion) => sortObjects(a, b, 'rank', 'ASC'));

  const onSelect = (result: string) => {
    const updatedQuestionId: string = filteredQuestions.find(
      (question: IQuestion) => question.title === result
    )?.id;

    setQuestionId(updatedQuestionId);
  };

  return (
    <Dropdown
      fit
      className="mb-sm--nlc"
      value={filteredQuestions?.find(({ id }) => id === questionId)?.title}
      values={filteredQuestions?.map(({ title }) => title)}
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
