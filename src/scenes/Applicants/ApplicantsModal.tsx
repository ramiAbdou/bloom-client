import React from 'react';

import Row from '@components/containers/Row/Row';
import { IMember, IMemberValue, MemberStatus } from '@db/db.entities';
import useFindOne from '@gql/hooks/useFindOne';
import QuestionBox from '@components/molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@components/molecules/QuestionBox/QuestionBox.types';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsModalTitle: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const { firstName, lastName } = useFindOne(IMember, {
    fields: ['firstName', 'lastName'],
    where: { id: memberId }
  });

  const fullName: string = `${firstName} ${lastName}`;

  return <h1>{fullName}</h1>;
};

const ApplicantsModalItems: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const { email, memberValues } = useFindOne(IMember, {
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

  const items: QuestionBoxItemProps[] = memberValues
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
            ? email
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
