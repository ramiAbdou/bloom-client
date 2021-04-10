import React, { useEffect } from 'react';

import Row from '@components/containers/Row/Row';
import PanelCloseButton from '@components/organisms/Panel/PanelCloseButton';
import { IQuestion } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFind from '@gql/hooks/useFind';
import { QuestionType } from '@util/constants';
import { sortObjects } from '@util/util';
import ListFilterQuestion from '../ListFilterQuestion/ListFilterQuestion';
import ListFilterStore from './ListFilter.store';
import ListFilterApplyButton from './ListFilterApplyButton';
import ListFilterClearButton from './ListFilterClearButton';

const ListFilterHeader: React.FC = () => (
  <Row className="mx-xs my-sm" justify="sb" spacing="xs">
    <h3>Filters</h3>
    <ListFilterClearButton />
  </Row>
);

const ListFilterQuestionList: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const questions: IQuestion[] = useFind(IQuestion, {
    fields: ['locked', 'rank', 'type'],
    where: { communityId }
  });

  const sortedQuestions: IQuestion[] = questions
    ?.sort((a: IQuestion, b: IQuestion) => sortObjects(a, b, 'rank', 'ASC'))
    ?.filter(
      (question: IQuestion) =>
        !question.locked && question.type === QuestionType.MULTIPLE_CHOICE
    );

  return (
    <ul>
      {sortedQuestions?.map(({ id }: IQuestion) => (
        <ListFilterQuestion key={id} id={id} />
      ))}
    </ul>
  );
};

const ListFilterActions: React.FC = () => (
  <Row className="mx-xs py-sm" spacing="xs">
    <ListFilterApplyButton />
    <PanelCloseButton />
  </Row>
);

const ListFilter: React.FC = () => {
  const setOpenQuestionId = ListFilterStore.useStoreActions(
    (state) => state.setOpenQuestionId
  );

  // When the panel closes, ensure that no question is expanded when it opens
  // back up again.
  useEffect(() => () => setOpenQuestionId(null), []);

  return (
    <>
      <ListFilterHeader />
      <ListFilterQuestionList />
      <ListFilterActions />
    </>
  );
};

export default ListFilter;
