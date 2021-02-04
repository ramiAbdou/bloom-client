import React from 'react';

import Separator from '@atoms/Separator';
import Show from '@containers/Show';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import { IMember, IMemberData, IQuestion } from '@store/Db/entities';
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
      ?.map((dataId: string) => byDataId[dataId])
      ?.filter((data: IMemberData) => {
        const question: IQuestion = byQuestionId[data.question];
        return questions.has(question?.id) && question?.inExpandedDirectoryCard;
      })
      ?.map((element: IMemberData) => {
        const { title, type }: IQuestion = byQuestionId[element.question];
        return { title, type, value: element.value };
      });
  });

  return (
    <Show show={items?.some(({ value }) => !!value)}>
      <Separator marginBottom={24} />
      <QuestionValueList handleNull="HIDE_ALL" items={items} />
    </Show>
  );
};

export default MemberProfileData;
