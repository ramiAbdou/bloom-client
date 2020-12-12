import deepequal from 'fast-deep-equal';
import { useQuery } from 'graphql-hooks';
import React, { useEffect } from 'react';

import Dropdown from '@components/Elements/Dropdown';
import { IDropdownOption } from '@components/Elements/Dropdown.store';
import { IQuestion } from '@store/entities';
import Loading from '@store/Loading.store';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_QUESTIONS } from '../../../Analytics.gql';
import PlaygroundChart from './Chart';
import Playground from './Playground.store';

const useFetchQuestions = () => {
  const mergeEntities = useStoreActions(({ db }) => db.mergeEntities);
  const currentLoading = Loading.useStoreState((store) => store.loading);
  const setLoading = Loading.useStoreActions((store) => store.setLoading);

  const { data, loading } = useQuery(GET_QUESTIONS);

  useEffect(() => {
    if (loading !== currentLoading) setLoading(loading);
  }, [loading]);

  useEffect(() => {
    const { id, questions } = data?.getDatabase ?? {};
    if (!id) return;

    mergeEntities({
      data: { id, questions },
      schema: Schema.COMMUNITY
    });
  }, [data]);
};

const PlaygroundHeader = () => {
  const questions = useStoreState(({ db }) => {
    const { byId } = db.entities.questions;
    return db.community.questions?.map((id: string) => byId[id]);
  }, deepequal) as IQuestion[];

  const questionId = Playground.useStoreState((store) => store.questionId);

  const setQuestionId = Playground.useStoreActions(
    (store) => store.setQuestionId
  );

  useFetchQuestions();

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

export default () => {
  return (
    <Playground.Provider>
      <div className="s-analytics-members-playground">
        <PlaygroundHeader />
        <PlaygroundChart />
      </div>
    </Playground.Provider>
  );
};
