import React from 'react';

import Separator from '@atoms/Separator';
import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import { GetMemberDataArgs } from '@store/Db/Db.gql';
import { IMember, IMemberData, IQuestion } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import MemberProfileStore from './MemberProfile.store';

const MemberProfileDataContent: React.FC = () => {
  const memberId = MemberProfileStore.useStoreState((store) => store.memberId);

  const questions: Set<string> = useStoreState(({ db }) => {
    return new Set(db.community?.questions);
  });

  const items: QuestionValueItemProps[] = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];

    return member?.data
      ?.map((dataId: string) => db.byDataId[dataId])
      ?.filter((data: IMemberData) => {
        const question: IQuestion = db.byQuestionId[data.question];
        return questions.has(question?.id) && question?.inExpandedDirectoryCard;
      })
      ?.map((element: IMemberData) => {
        const { title, type }: IQuestion = db.byQuestionId[element.question];
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

const MemberProfileData: React.FC = () => {
  const memberId = MemberProfileStore.useStoreState((store) => store.memberId);

  const { loading } = useQuery<IMemberData[], GetMemberDataArgs>({
    fields: ['id', 'value', { member: ['id'] }, { question: ['id'] }],
    operation: 'getMemberData',
    schema: [Schema.MEMBER_DATA],
    types: { memberId: { required: false } },
    variables: { memberId }
  });

  if (loading) return null;
  return <MemberProfileDataContent />;
};

export default MemberProfileData;
