import React from 'react';

import Show from '@containers/Show';
import { IMemberData, IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import ListFilterStore from '../ListFilter/ListFilter.store';
import ListFilterQuestionOption from './ListFilterQuestionOption';

const ListFilterQuestionOptionList: React.FC = () => {
  const questionId: string = IdStore.useStoreState((store) => store.id);

  const openQuestionId = ListFilterStore.useStoreState(
    (state) => state.openQuestionId
  );

  const isOpen = questionId === openQuestionId;

  const options: string[] = useStoreState(({ db }) => {
    const question: IQuestion = db.byQuestionId[questionId];

    const data: IMemberData[] = question?.data?.map(
      (dataId: string) => db.byDataId[dataId]
    );

    return question?.options?.sort((aOption, bOption) => {
      const aNumOptions: number = data?.filter(
        (element: IMemberData) => element?.value === aOption
      )?.length;

      const bNumOptions: number = data?.filter(
        (element: IMemberData) => element?.value === bOption
      )?.length;

      if (aNumOptions === bNumOptions) return 0;
      return aNumOptions < bNumOptions ? 1 : -1;
    });
  });

  return (
    <Show show={!!isOpen}>
      <ul className="mt-sm o-list-filter-question-option-list">
        {options.map((option: string) => {
          return <ListFilterQuestionOption key={option} value={option} />;
        })}
      </ul>
    </Show>
  );
};

export default ListFilterQuestionOptionList;
