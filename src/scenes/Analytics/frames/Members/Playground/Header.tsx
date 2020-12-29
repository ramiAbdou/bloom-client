import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';

import Dropdown from '@components/Elements/Dropdown/Dropdown';
import { IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';
import Playground from './Playground.store';

export default () => {
  // We only want the questions that are meaningful, and things like first/last
  // name aren't very meaningful.
  const questions = useStoreState(({ db }) => {
    const { byId } = db.entities.questions;
    return db.community.questions
      ?.map((id: string) => byId[id])
      .filter(
        ({ category }) =>
          !['FIRST_NAME', 'LAST_NAME', 'EMAIL', 'JOINED_ON'].includes(category)
      );
  }, deepequal) as IQuestion[];

  const questionId = Playground.useStoreState((store) => store.questionId);

  const setQuestionId = Playground.useStoreActions(
    (store) => store.setQuestionId
  );

  useEffect(() => {
    if (!questions?.length) return;
    const { id } = questions[0];
    if (id !== questionId && questionId.length === 0) setQuestionId(id);
  }, [questions]);

  if (!questionId) return null;

  const onUpdate = (result: string[]) => {
    const title = result[0];

    const updatedQuestionId = questions.find(
      (question) => question.title === title
    )?.id;

    setQuestionId(updatedQuestionId);
  };

  return (
    <div>
      <h3>Data Playground</h3>
      <p>Choose any piece of data that you'd like to explore.</p>
      <Dropdown
        options={questions.map(({ title }) => title)}
        value={[questions.find(({ id }) => id === questionId)?.title]}
        onUpdate={onUpdate}
      />
    </div>
  );
};
