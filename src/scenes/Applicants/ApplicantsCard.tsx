import React from 'react';

import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import QuestionBox from '@molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@molecules/QuestionBox/QuestionBox.types';
import {
  IMember,
  IMemberValue,
  IQuestion,
  MemberStatus
} from '@store/db/Db.entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import { IdProps } from '@util/constants';
import { sortObjects } from '@util/util';
import ApplicantsCardHeader from './ApplicantsCardHeader';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsCardActions: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  return (
    <Row equal className="mt-auto" spacing="xs">
      <ApplicantsRespondButton
        applicantIds={[memberId]}
        response={MemberStatus.ACCEPTED}
      />

      <ApplicantsRespondButton
        applicantIds={[memberId]}
        response={MemberStatus.REJECTED}
      />
    </Row>
  );
};

const ApplicantsCardItems: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const items: QuestionBoxItemProps[] = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];

    const data: IMemberValue[] = member.memberValues?.map(
      (memberValueId: string) => db.byMemberValuesId[memberValueId]
    );

    return db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.filter((question: IQuestion) => !question?.category)
      ?.sort((a, b) => sortObjects(a, b, 'rank', 'ASC'))
      ?.map((question: IQuestion) => {
        const element: IMemberValue = data?.find(
          (entity: IMemberValue) => entity.question === question.id
        );

        return {
          title: question?.title,
          type: question?.type,
          value: element?.value
        };
      })
      ?.slice(0, 5);
  });

  return <QuestionBox className="mb-md--nlc" items={items} />;
};

const ApplicantsCard: React.FC<IdProps> = (args) => {
  const { id } = args;

  return (
    <IdStore.Provider runtimeModel={{ id }}>
      <Card className="bs-bb w-100--m">
        <ApplicantsCardHeader />
        <ApplicantsCardItems />
        <ApplicantsCardActions />
      </Card>
    </IdStore.Provider>
  );
};

export default ApplicantsCard;
