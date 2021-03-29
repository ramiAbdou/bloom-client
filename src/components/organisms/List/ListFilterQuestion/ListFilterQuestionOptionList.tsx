import React from 'react';

import Show from '@containers/Show';
import { IMemberValue, IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionOption from './ListFilterQuestionOption';

const ListFilterQuestionOptionList: React.FC = () => {
  const questionId: string = IdStore.useStoreState((state) => state.id);

  const openQuestionId = ListFilterStore.useStoreState(
    (state) => state.openQuestionId
  );

  const isOpen = questionId === openQuestionId;

  const options: string[] = useStoreState(({ db }) => {
    const question: IQuestion = db.byQuestionId[questionId];

    const data: IMemberValue[] = question?.values?.map(
      (valueId: string) => db.byValuesId[valueId]
    );

    return question?.options?.sort((aOption, bOption) => {
      const aNumOptions: number = data?.filter(
        (element: IMemberValue) => element?.value === aOption
      )?.length;

      const bNumOptions: number = data?.filter(
        (element: IMemberValue) => element?.value === bOption
      )?.length;

      if (aNumOptions === bNumOptions) return 0;
      return aNumOptions < bNumOptions ? 1 : -1;
    });
  });

  return (
    <Show show={!!isOpen}>
      <ul className="mt-sm o-list-filter-question-option-list">
        {options.map((option: string) => (
          <ListFilterQuestionOption key={option} value={option} />
        ))}
      </ul>
    </Show>
  );
};

export default ListFilterQuestionOptionList;
