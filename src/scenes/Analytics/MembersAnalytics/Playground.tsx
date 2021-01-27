import React, { useEffect } from 'react';

import Dropdown from '@molecules/Dropdown/Dropdown';
import Chart from '@organisms/Chart/Chart';
import { IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import Playground from './Playground.store';

const PlaygroundDropdown: React.FC = () => {
  // We only want the questions that are meaningful, and things like first/last
  // name aren't very meaningful.
  const questions = useStoreState(({ db }) => {
    const { byId } = db.entities.questions;
    return db.community.questions
      ?.map((id: string) => byId[id])
      .filter(
        ({ category }) =>
          !['FIRST_NAME', 'LAST_NAME', 'EMAIL', 'JOINED_AT'].includes(category)
      );
  }) as IQuestion[];

  const questionId = Playground.useStoreState((store) => store.questionId);

  const setQuestionId = Playground.useStoreActions(
    (store) => store.setQuestionId
  );

  const onUpdate = (result: string[]) => {
    const title = result[0];

    const updatedQuestionId = questions.find(
      (question) => question.title === title
    )?.id;

    setQuestionId(updatedQuestionId);
  };

  return (
    <Dropdown
      options={questions?.map(({ title }) => title)}
      value={[questions?.find(({ id }) => id === questionId)?.title]}
      onUpdate={onUpdate}
    />
  );
};

const PlaygroundHeader: React.FC = () => {
  // We only want the questions that are meaningful, and things like first/last
  // name aren't very meaningful.
  const initialQuestionId: string = useStoreState(({ db }) => {
    const { byId } = db.entities.questions;

    return db.community.questions
      ?.map((id: string) => byId[id])
      .filter(
        ({ category }) =>
          !['FIRST_NAME', 'LAST_NAME', 'EMAIL', 'JOINED_AT'].includes(category)
      )[0].id;
  });

  const questionId = Playground.useStoreState((store) => store.questionId);

  const setQuestionId = Playground.useStoreActions(
    (store) => store.setQuestionId
  );

  useEffect(() => {
    if (!questionId && initialQuestionId !== questionId) {
      setQuestionId(initialQuestionId);
    }
  }, [initialQuestionId]);

  if (!questionId) return null;

  return (
    <div>
      <h3>Data Playground</h3>
      <p>Choose any piece of data that you'd like to explore.</p>
      <PlaygroundDropdown />
    </div>
  );
};

const PlaygroundChart: React.FC = () => {
  const questionId = Playground.useStoreState((store) => store.questionId);
  return <Chart questionId={questionId} />;
};

/**
 * Only state that is tracked here is the questionId of the question that is
 * currently being displayed.
 */
const MembersAnalyticsPlayground = () => (
  <Playground.Provider>
    <div className="s-analytics-members-playground">
      <PlaygroundHeader />
      <PlaygroundChart />
    </div>
  </Playground.Provider>
);

export default MembersAnalyticsPlayground;
