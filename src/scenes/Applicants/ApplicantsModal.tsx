import React from 'react';

import Row from '@containers/Row/Row';
import QuestionBox from '@molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@molecules/QuestionBox/QuestionBox.types';
import {
  IMember,
  IMemberValue,
  IQuestion,
  MemberStatus
} from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';
import { sortObjects } from '@util/util';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsModalTitle: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const fullName: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return `${member?.firstName} ${member?.lastName}`;
  });

  return <h1>{fullName}</h1>;
};

const ApplicantsModalItems: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const items: QuestionBoxItemProps[] = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];

    const data: IMemberValue[] = member.values?.map(
      (valueId: string) => db.byValuesId[valueId]
    );

    return db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.filter(
        (question: IQuestion) =>
          !question.category || question.category === QuestionCategory.EMAIL
      )
      ?.sort((a: IQuestion, b: IQuestion) => sortObjects(a, b, 'rank', 'ASC'))
      ?.map((question: IQuestion) => {
        const element: IMemberValue = data?.find(
          (entity: IMemberValue) => entity.question === question.id
        );

        return {
          title: question.title,
          type: question.type,
          value:
            question.category === QuestionCategory.EMAIL
              ? member.email
              : element?.value
        };
      });
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
