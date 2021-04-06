import React from 'react';
import { IoAdd } from 'react-icons/io5';

import Row from '@containers/Row/Row';
import { IQuestion } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import IdStore from '@store/Id.store';
import { cx } from '@util/util';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionStore from './ListFilterQuestion.store';

const ListFilterQuestionHeader: React.FC = () => {
  const questionId: string = IdStore.useStoreState((state) => state.id);

  const openQuestionId = ListFilterStore.useStoreState(
    (state) => state.openQuestionId
  );

  const areValuesSelected: boolean = ListFilterQuestionStore.useStoreState(
    (state) => !!state.values?.length
  );

  const { title } = useFindOne(IQuestion, {
    fields: ['title'],
    where: { id: questionId }
  });

  const css: string = cx('w-100', { 'mb-ss--nlc': areValuesSelected });

  return (
    <Row className={css} justify="sb" spacing="xs">
      <h4 className="overflow-ellipses">{title}</h4>
      {questionId !== openQuestionId && <IoAdd />}
    </Row>
  );
};

export default ListFilterQuestionHeader;
