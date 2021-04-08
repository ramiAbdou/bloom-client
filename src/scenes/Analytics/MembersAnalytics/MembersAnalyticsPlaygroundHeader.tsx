import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Show from '@containers/Show';
import { IMemberType, IQuestion } from '@db/db.entities';
import useFind from '@gql/useFind';
import Dropdown from '@molecules/Dropdown/Dropdown';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';
import { sortObjects } from '@util/util';

const MembersAnalyticsPlaygroundDropdown: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.community.id);

  const memberTypes: IMemberType[] = useFind(IMemberType, {
    where: { communityId }
  });

  const questions: IQuestion[] = useFind(IQuestion, {
    fields: ['category', 'rank'],
    where: { communityId }
  });

  const filteredQuestions: IQuestion[] = questions
    ?.filter((question: IQuestion) => {
      const isMemberTypeAllowed: boolean =
        question.category === QuestionCategory.MEMBER_TYPE &&
        memberTypes.length >= 2;

      return (
        !question.category ||
        isMemberTypeAllowed ||
        question.category === QuestionCategory.GENDER
      );
    })
    ?.sort((a: IQuestion, b: IQuestion) => sortObjects(a, b, 'rank', 'ASC'));

  const questionId: string = IdStore.useStoreState((state) => state.id);

  const setQuestionId: ActionCreator<string> = IdStore.useStoreActions(
    (state) => state.setId
  );

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
