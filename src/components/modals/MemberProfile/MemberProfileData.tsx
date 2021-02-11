import React from 'react';

import Separator from '@atoms/Separator';
import Show from '@containers/Show';
import useQuery from '@hooks/useQuery';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import { GET_MEMBER_DATA, GetMemberDataArgs } from '@store/Db/Db.gql';
import { IMember, IMemberData, IQuestion } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreState } from '@store/Store';
import Spinner from '../../atoms/Spinner/Spinner';
import MemberProfileStore from './MemberProfile.store';

const MemberProfileData: React.FC = () => {
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

  const { loading } = useQuery<IMemberData[], GetMemberDataArgs>({
    name: 'getMemberData',
    query: GET_MEMBER_DATA,
    schema: [Schema.MEMBER_DATA],
    variables: { memberId }
  });

  if (loading) return <Spinner show />;

  return (
    <Show show={items?.some(({ value }) => !!value)}>
      <Separator marginBottom={24} />
      <QuestionValueList handleNull="HIDE_ALL" items={items} />
    </Show>
  );
};

export default MemberProfileData;
