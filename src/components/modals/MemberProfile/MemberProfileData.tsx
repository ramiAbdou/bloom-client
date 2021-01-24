import React from 'react';

import Separator from '@atoms/Separator';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import { IMember, IMemberData, IQuestion } from '@store/entities';
import { useStoreState } from '@store/Store';
import MemberProfileStore from './MemberProfile.store';

const MemberProfileData: React.FC = () => {
  const memberId = MemberProfileStore.useStoreState((store) => store.memberId);

  const questions: Set<string> = useStoreState(({ db }) => {
    return new Set(db.community?.questions);
  });

  const items: QuestionValueItemProps[] = useStoreState(({ db }) => {
    const { byId: byDataId } = db.entities.data;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byQuestionId } = db.entities.questions;

    const member: IMember = byMemberId[memberId];

    return member?.data
      ?.map((dataId) => byDataId[dataId])
      ?.filter((element: IMemberData) => {
        const question: IQuestion = byQuestionId[element.question];
        return questions.has(question?.id) && question?.inExpandedDirectoryCard;
      })
      ?.map((element: IMemberData) => {
        const { title, type }: IQuestion = byQuestionId[element.question];
        return { title, type, value: element.value };
      });
  });

  // If the member has just got onto the platform and no data is filled out,
  // leave it out of the member card.
  if (items.every(({ value }) => value === null)) return null;

  return (
    <>
      <Separator marginBottom={24} />
      <QuestionValueList handleNull="HIDE_ALL" items={items} />
    </>
  );
};

export default MemberProfileData;
