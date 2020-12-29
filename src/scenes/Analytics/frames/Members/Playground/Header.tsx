import deepequal from 'fast-deep-equal';
import React, { useEffect } from 'react';

import Dropdown from '@components/Elements/Dropdown/Dropdown';
import { IDropdownOption } from '@components/Elements/Dropdown/Dropdown.store';
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

  const onChange = ({ id }: IDropdownOption) => setQuestionId(id);

  return (
    <div>
      <h3>Data Playground</h3>
      <p>Choose any piece of data that you'd like to explore.</p>
      <Dropdown
        activeId={questionId}
        options={questions.map(({ title: t, id }) => ({ id, title: t }))}
        onChange={onChange}
      />
    </div>
  );
};
