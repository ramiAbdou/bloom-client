import React from 'react';

import Separator from '@atoms/Separator';
import Show from '@containers/Show';
import QuestionBox from '@molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@molecules/QuestionBox/QuestionBox.types';
import { IMember, IMemberValue, IQuestion } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import ProfileStore from './Profile.store';
import useInitProfileData from './useInitProfileData';

const ProfileDataContent: React.FC = () => {
  const memberId = ProfileStore.useStoreState((store) => store.memberId);

  const questions: Set<string> = useStoreState(({ db }) => {
    return new Set(db.community?.questions);
  });

  const items: QuestionBoxItemProps[] = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];

    return member?.values
      ?.map((valueId: string) => db.byValuesId[valueId])
      ?.filter((data: IMemberValue) => {
        const question: IQuestion = db.byQuestionId[data.question];

        return (
          questions.has(question?.id) &&
          !question?.category &&
          !question?.locked
        );
      })
      ?.map((element: IMemberValue) => {
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
  const loading = useInitProfileData();

  if (loading) return null;
  return <ProfileDataContent />;
};

export default ProfileData;
