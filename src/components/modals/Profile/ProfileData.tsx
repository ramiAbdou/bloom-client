import React from 'react';

import Separator from '@atoms/Separator';
import Show from '@containers/Show';
import QuestionBox from '@molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@molecules/QuestionBox/QuestionBox.types';
import { IMember, IMemberValue, IQuestion } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import useInitProfileData from './useInitProfileData';

const ProfileDataContent: React.FC = () => {
  const memberId: string = IdStore.useStoreState((state) => state.id);

  const items: QuestionBoxItemProps[] = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];

    const filteredValues: IMemberValue[] = member?.values
      ?.map((valueId: string) => db.byValuesId[valueId])
      ?.filter((data: IMemberValue) => {
        const question: IQuestion = db.byQuestionId[data.question];
        return !question?.category;
      });

    const sortedValues: IMemberValue[] = filteredValues?.sort((a, b) => {
      const aQuestion: IQuestion = db.byQuestionId[a.question];
      const bQuestion: IQuestion = db.byQuestionId[b.question];
      return sortObjects(aQuestion, bQuestion, 'rank', 'ASC');
    });

    return sortedValues?.map((element: IMemberValue) => {
      const { title, type }: IQuestion = db.byQuestionId[element.question];
      return { title, type, value: element.value };
    });
  });

  return (
    <Show show={items?.some(({ value }) => !!value)}>
      <Separator margin={0} />
      <QuestionBox className="my-md" handleNull="HIDE_ALL" items={items} />
    </Show>
  );
};

const ProfileData: React.FC = () => {
  const { loading } = useInitProfileData();

  if (loading) return null;
  return <ProfileDataContent />;
};

export default ProfileData;
