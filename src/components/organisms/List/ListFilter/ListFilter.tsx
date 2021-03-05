import React, { useEffect } from 'react';

import Row from '@containers/Row/Row';
import PanelCloseButton from '@organisms/Panel/PanelCloseButton';
import { IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import ListFilterQuestion from '../ListFilterQuestion/ListFilterQuestion';
import ListFilterStore from './ListFilter.store';
import ListFilterApplyButton from './ListFilterApplyButton';
import ListFilterClearButton from './ListFilterClearButton';

const ListFilterHeader: React.FC = () => {
  return (
    <Row className="mx-xs my-sm" justify="sb" spacing="xs">
      <h3>Filters</h3>
      <ListFilterClearButton />
    </Row>
  );
};

const ListFilterQuestionList: React.FC = () => {
  const questions: IQuestion[] = useStoreState(({ db }) => {
    return db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.sort((a, b) => sortObjects(a, b, 'rank', 'ASC'))
      ?.filter((question: IQuestion) => {
        return !question.locked && !!question.options?.length;
      });
  });

  return (
    <ul>
      {questions?.map(({ id }: IQuestion) => {
        return <ListFilterQuestion key={id} id={id} />;
      })}
    </ul>
  );
};

const ListFilterActions: React.FC = () => {
  return (
    <Row className="mx-xs py-sm" spacing="xs">
      <ListFilterApplyButton />
      <PanelCloseButton />
    </Row>
  );
};

const ListFilter: React.FC = () => {
  const setOpenQuestionId = ListFilterStore.useStoreActions(
    (state) => state.setOpenQuestionId
  );

  // When the panel closes, ensure that no question is expanded when it opens
  // back up again.
  useEffect(() => {
    return () => setOpenQuestionId(null);
  }, []);

  return (
    <>
      <ListFilterHeader />
      <ListFilterQuestionList />
      <ListFilterActions />
    </>
  );
};

export default ListFilter;
