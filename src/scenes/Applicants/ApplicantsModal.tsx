import React from 'react';

import Row from '@containers/Row/Row';
import QuestionBox from '@molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@molecules/QuestionBox/QuestionBox.types';
import {
  IMember,
  IMemberValue,
  IQuestion,
  IUser,
  MemberStatus
} from '@store/Db/entities';
import { useStoreState } from '@store/Store';
import { QuestionCategory } from '@util/constants';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsModalTitle: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const fullName = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    const user: IUser = db.byUserId[member?.user];
    return `${user?.firstName} ${user?.lastName}`;
  });

  return <h1>{fullName}</h1>;
};

const ApplicantsModalItems: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  const items: QuestionBoxItemProps[] = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    const user: IUser = db.byUserId[member?.user];

    const data: IMemberValue[] = member.values?.map(
      (valueId: string) => db.byValuesId[valueId]
    );

    return db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.filter((question: IQuestion) => {
        return (
          !question?.category || question?.category === QuestionCategory.EMAIL
        );
      })
      ?.map((question: IQuestion) => {
        const element: IMemberValue = data?.find((entity: IMemberValue) => {
          return entity.question === question.id;
        });

        return {
          title: question?.title,
          type: question?.type,
          value:
            question.category === QuestionCategory.EMAIL
              ? user.email
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

const ApplicantsModal: React.FC = () => {
  return (
    <>
      <ApplicantsModalTitle />
      <ApplicantsModalItems />
      <ApplicantsModalActionContainer />
    </>
  );
};

export default ApplicantsModal;
