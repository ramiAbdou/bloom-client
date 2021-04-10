import React from 'react';

import Show from '@components/containers/Show';
import { IMemberValue, IQuestion } from '@core/db/db.entities';
import IdStore from '@core/store/Id.store';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionOption from './ListFilterQuestionOption';

const ListFilterQuestionOptionList: React.FC = () => {
  const questionId: string = IdStore.useStoreState((state) => state.id);

  const openQuestionId = ListFilterStore.useStoreState(
    (state) => state.openQuestionId
  );

  const isOpen = questionId === openQuestionId;

  const { data: question, loading } = useFindOneFull(IQuestion, {
    fields: ['memberValues.id', 'memberValues.value', 'options'],
    where: { id: questionId }
  });

  if (loading) return null;

  const sortedOptions: string[] = question.options?.sort(
    (a: string, b: string) => {
      const aNumOptions: number = question.memberValues?.filter(
        (memberValue: IMemberValue) => memberValue?.value === a
      )?.length;

      const bNumOptions: number = question.memberValues?.filter(
        (memberValue: IMemberValue) => memberValue?.value === b
      )?.length;

      if (aNumOptions === bNumOptions) return 0;
      return aNumOptions < bNumOptions ? 1 : -1;
    }
  );

  return (
    <Show show={!!isOpen}>
      <ul className="mt-sm o-list-filter-question-option-list">
        {sortedOptions?.map((sortedOption: string) => (
          <ListFilterQuestionOption key={sortedOption} value={sortedOption} />
        ))}
      </ul>
    </Show>
  );
};

export default ListFilterQuestionOptionList;
