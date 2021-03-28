import React, { useEffect } from 'react';

import LoadingHeader from '@containers/LoadingHeader/LoadingHeader';
import MainSection from '@containers/Main/MainSection';
import Show from '@containers/Show';
import Dropdown from '@molecules/Dropdown/Dropdown';
import Chart from '@organisms/Chart/Chart';
import { IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';
import { sortObjects } from '@util/util';

const MembersAnalyticsPlaygroundDropdown: React.FC = () => {
  // We only want the questions that are meaningful, and things like first/last
  // name aren't very meaningful.
  const questions: IQuestion[] = useStoreState(({ db }) => {
    return db.community.questions
      ?.map((questionId: string) => {
        return db.byQuestionId[questionId];
      })
      ?.sort((a, b) => {
        return sortObjects(a, b, 'rank', 'ASC');
      })
      ?.filter((question: IQuestion) => {
        return (
          !question.category ||
          [
            QuestionCategory.DUES_STATUS,
            QuestionCategory.GENDER,
            QuestionCategory.MEMBER_PLAN
          ].includes(question.category)
        );
      });
  });

  const questionId = IdStore.useStoreState((state) => {
    return state.id;
  });

  const setId = IdStore.useStoreActions((store) => {
    return store.setId;
  });

  const onSelect = (result: string) => {
    const updatedQuestionId = questions.find((question) => {
      return question.title === result;
    })?.id;

    setId(updatedQuestionId);
  };

  return (
    <Dropdown
      fit
      className="mb-sm--nlc"
      value={
        questions?.find(({ id }) => {
          return id === questionId;
        })?.title
      }
      values={questions?.map(({ title }) => {
        return title;
      })}
      onSelect={onSelect}
    />
  );
};

const MembersAnalyticsPlaygroundHeader: React.FC = () => {
  // We only want the questions that are meaningful, and things like first/last
  // name aren't very meaningful.
  const initialQuestionId: string = useStoreState(({ db }) => {
    return db.community.questions
      ?.map((id: string) => {
        return db.byQuestionId[id];
      })
      ?.filter((question: IQuestion) => {
        return (
          !question.category ||
          [
            QuestionCategory.DUES_STATUS,
            QuestionCategory.GENDER,
            QuestionCategory.MEMBER_PLAN
          ].includes(question.category)
        );
      })[0].id;
  });

  const questionId = IdStore.useStoreState((state) => {
    return state.id;
  });

  const setId = IdStore.useStoreActions((store) => {
    return store.setId;
  });

  useEffect(() => {
    if (!questionId && initialQuestionId !== questionId) {
      setId(initialQuestionId);
    }
  }, [initialQuestionId]);

  return (
    <Show show={!!questionId}>
      <p className="mb-xs--nlc">
        Choose any piece of data that you'd like to explore.
      </p>

      <MembersAnalyticsPlaygroundDropdown />
    </Show>
  );
};

const MembersAnalyticsPlaygroundChart: React.FC = () => {
  const questionId = IdStore.useStoreState((state) => {
    return state.id;
  });

  return <Chart questionId={questionId} />;
};

/**
 * Only state that is tracked here is the questionId of the question that is
 * currently being displayed.
 */
const MembersAnalyticsPlayground: React.FC = () => {
  return (
    <MainSection>
      <LoadingHeader h2 title="Data Playground" />
      <IdStore.Provider>
        <div className="s-analytics-members-playground">
          <MembersAnalyticsPlaygroundHeader />
          <MembersAnalyticsPlaygroundChart />
        </div>
      </IdStore.Provider>
    </MainSection>
  );
};

export default MembersAnalyticsPlayground;
