import React from 'react';

import Row from '@components/containers/Row/Row';
import QuestionBox from '@components/molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@components/molecules/QuestionBox/QuestionBox.types';
import { IMember, IMemberValue, MemberStatus } from '@core/db/db.entities';
import { useStoreState } from '@core/store/Store';
import useFindOneFull from '@gql/hooks/useFindOneFull';
import { QuestionCategory } from '@util/constants';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsModalTitle: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const { data: member, loading } = useFindOneFull(IMember, {
    fields: ['firstName', 'lastName'],
    where: { id: memberId }
  });

  if (loading) return null;

  const fullName: string = `${member.firstName} ${member.lastName}`;

  return <h1>{fullName}</h1>;
};

const ApplicantsModalItems: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const { data: member, loading } = useFindOneFull(IMember, {
    fields: [
      'email',
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
        memberValue.question.category === QuestionCategory.GENDER ||
        memberValue.question.category === QuestionCategory.EMAIL
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
        value:
          memberValue.question.category === QuestionCategory.EMAIL
            ? member.email
            : memberValue.value
      };
    });

  return (
    <section className="c-modal-content-ctr">
      <QuestionBox items={items} />
    </section>
  );
};

const ApplicantsModalActionContainer: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  return (
    <Row equal spacing="xs">
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

const ApplicantsModal: React.FC = () => (
  <>
    <ApplicantsModalTitle />
    <ApplicantsModalItems />
    <ApplicantsModalActionContainer />
  </>
);

export default ApplicantsModal;
