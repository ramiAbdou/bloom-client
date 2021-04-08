import React from 'react';

import Separator from '@atoms/Separator';
import Show from '@containers/Show';
import { IMemberValue } from '@db/db.entities';
import useFind from '@gql/useFind';
import useFindFull from '@gql/useFindFull';
import QuestionBox from '@molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@molecules/QuestionBox/QuestionBox.types';
import IdStore from '@store/Id.store';

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

  const { loading } = useFindFull(IMemberValue, {
    fields: ['member.id', 'question.id', 'value'],
    where: { memberId }
  });

  if (loading) return null;
  return <ProfileDataContent />;
};

export default ProfileData;
