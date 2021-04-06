import React from 'react';

import Show from '@containers/Show';
import { IMemberValue, IQuestion } from '@db/db.entities';
import useFindOne from '@gql/useFindOne';
import IdStore from '@store/Id.store';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionOption from './ListFilterQuestionOption';

const ListFilterQuestionOptionList: React.FC = () => {
  const questionId: string = IdStore.useStoreState((state) => state.id);

  const openQuestionId = ListFilterStore.useStoreState(
    (state) => state.openQuestionId
  );

  const isOpen = questionId === openQuestionId;

  const { memberValues, options } = useFindOne(IQuestion, {
    fields: ['memberValues.id', 'memberValues.value', 'options'],
    where: { id: questionId }
  });

  const sortedOptions: string[] = options?.sort((a: string, b: string) => {
    const aNumOptions: number = memberValues?.filter(
      (memberValue: IMemberValue) => memberValue?.value === a
    )?.length;

    const bNumOptions: number = memberValues?.filter(
      (memberValue: IMemberValue) => memberValue?.value === b
    )?.length;

    if (aNumOptions === bNumOptions) return 0;
    return aNumOptions < bNumOptions ? 1 : -1;
  });

  return (
    <Show show={!!isOpen}>
      <ul className="mt-sm o-list-filter-question-option-list">
        {sortedOptions.map((sortedOption: string) => (
          <ListFilterQuestionOption key={sortedOption} value={sortedOption} />
        ))}
      </ul>
    </Show>
  );
};

export default ListFilterQuestionOptionList;
