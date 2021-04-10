import React from 'react';

import Card from '@components/containers/Card/Card';
import Row from '@components/containers/Row/Row';
import QuestionBox from '@components/molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@components/molecules/QuestionBox/QuestionBox.types';
import { IMember, IMemberValue, MemberStatus } from '@core/db/db.entities';
import IdStore from '@core/store/Id.store';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import { IdProps, QuestionCategory } from '@util/constants';
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

  const { data: member, loading } = useFindOneFull(IMember, {
    fields: [
      'memberValues.id',
      'memberValues.question.category',
      'memberValues.question.id',
      'memberValues.question.rank',
      'memberValues.question.title',
      'memberValues.question.type',
      'memberValues.value'
    ],
    where: { id: memberId }
  });

  if (loading) return null;

  const items: QuestionBoxItemProps[] = member.memberValues
    ?.filter(
      (memberValue: IMemberValue) =>
        !memberValue.question.category ||
        memberValue.question.category === QuestionCategory.GENDER
    )
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
    })
    ?.slice(0, 5);

  return <QuestionBox className="mb-md--nlc" items={items} />;
};

const ApplicantsCard: React.FC<IdProps> = ({ id: memberId }) => (
  <IdStore.Provider runtimeModel={{ id: memberId }}>
    <Card className="bs-bb w-100--m">
      <ApplicantsCardHeader />
      <ApplicantsCardItems />
      <ApplicantsCardActions />
    </Card>
  </IdStore.Provider>
);

export default ApplicantsCard;
