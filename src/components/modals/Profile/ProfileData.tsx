import React from 'react';

import Separator from '@components/atoms/Separator';
import Show from '@components/containers/Show';
import QuestionBox from '@components/molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@components/molecules/QuestionBox/QuestionBox.types';
import IdStore from '@core/store/Id.store';
import { IMemberValue } from '@core/db/db.entities';
import useFind from '@gql/hooks/useFind';
import useFindFull from '@gql/hooks/useFindFull';

const ProfileDataContent: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const memberValues: IMemberValue[] = useFind(IMemberValue, {
    fields: [
      'id',
      'question.category',
      'question.id',
      'question.rank',
      'question.title',
      'question.type',
      'value'
    ],
    where: { memberId }
  });

  const items: QuestionBoxItemProps[] = memberValues
    ?.filter((memberValue: IMemberValue) => !memberValue.question.category)
    ?.sort((a: IMemberValue, b: IMemberValue) => {
      if (a.question.rank < b.question.rank) return -1;
      if (a.question.rank > b.question.rank) return 1;
      return 0;
    })
    ?.map((memberValue: IMemberValue) => {
      return {
        title: memberValue.question.title,
        type: memberValue.question.type,
        value: memberValue.value
      };
    });

  return (
    <Show show={items?.some(({ value }) => !!value)}>
      <Separator margin={0} />
      <QuestionBox className="my-md" handleNull="HIDE_ALL" items={items} />
    </Show>
  );
};

const ProfileData: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const { data } = useFindFull(IMemberValue, {
    fields: ['member.id', 'question.id', 'value'],
    where: { memberId }
  });

  return data ? <ProfileDataContent /> : null;
};

export default ProfileData;
