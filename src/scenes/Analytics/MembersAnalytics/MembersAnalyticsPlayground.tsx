import React, { useEffect } from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import Dropdown from '@molecules/Dropdown/Dropdown';
import Chart from '@organisms/Chart/Chart';
import { GET_DATABASE } from '@scenes/Database/Database.gql';
import { IMember, IQuestion } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';

const PlaygroundDropdown: React.FC = () => {
  // We only want the questions that are meaningful, and things like first/last
  // name aren't very meaningful.
  const questions: IQuestion[] = useStoreState(({ db }) => {
    return db.community.questions
      ?.map((id: string) => db.byQuestionId[id])
      ?.filter(({ category }) => {
        return !['FIRST_NAME', 'LAST_NAME', 'EMAIL', 'JOINED_AT'].includes(
          category
        );
      });
  });

  const questionId = IdStore.useStoreState((store) => store.id);
  const setId = IdStore.useStoreActions((store) => store.setId);

  const onUpdate = (result: string[]) => {
    const title = result[0];

    const updatedQuestionId = questions.find(
      (question) => question.title === title
    )?.id;

    setId(updatedQuestionId);
  };

  return (
    <Dropdown
      fit
      className="mb-sm"
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
    return db.community.questions
      ?.map((id: string) => db.byQuestionId[id])
      .filter(
        ({ category }) =>
          !['FIRST_NAME', 'LAST_NAME', 'EMAIL', 'JOINED_AT'].includes(category)
      )[0].id;
  });

  const questionId = IdStore.useStoreState((store) => store.id);
  const setId = IdStore.useStoreActions((store) => store.setId);

  useEffect(() => {
    if (!questionId && initialQuestionId !== questionId) {
      setId(initialQuestionId);
    }
  }, [initialQuestionId]);

  return (
    <Show show={!!questionId}>
      <p className="mb-xs">
        Choose any piece of data that you'd like to explore.
      </p>
      <PlaygroundDropdown />
    </Show>
  );
};

const PlaygroundChart: React.FC = () => {
  const questionId = IdStore.useStoreState((store) => store.id);
  return <Chart questionId={questionId} />;
};

/**
 * Only state that is tracked here is the questionId of the question that is
 * currently being displayed.
 */
const MembersAnalyticsPlayground: React.FC = () => {
  const { loading } = useQuery<IMember[]>({
    name: 'getDatabase',
    query: GET_DATABASE,
    schema: [Schema.MEMBER]
  });

  return (
    <MainSection>
      <LoadingHeader h2 loading={loading} title="Data Playground" />
      <IdStore.Provider>
        <div className="s-analytics-members-playground">
          <PlaygroundHeader />
          <PlaygroundChart />
        </div>
      </IdStore.Provider>
    </MainSection>
  );
};

export default MembersAnalyticsPlayground;
