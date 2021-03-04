import day from 'dayjs';
import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
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
import IdStore from '@store/Id.store';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsCardHeader: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const createdAt: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return day(member?.createdAt).format('M/D/YY');
  });

  const fullName: string = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    return `${member?.firstName} ${member?.lastName}`;
  });

  const onClick = () => {
    showModal({ id: ModalType.APPLICANT, metadata: memberId });
  };

  return (
    <Row className="mb-md" justify="sb" spacing="xs">
      <div>
        <p className="meta">Applied {createdAt}</p>
        <h3>{fullName}</h3>
      </div>

      <Button tertiary onClick={onClick}>
        See Full Application
      </Button>
    </Row>
  );
};

const ApplicantsCardActionContainer: React.FC = () => {
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

    const data: IMemberValue[] = member.values?.map(
      (valueId: string) => db.byValuesId[valueId]
    );

    return db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.filter((question: IQuestion) => {
        return !question?.locked && !question?.category;
      })
      ?.map((question: IQuestion) => {
        const element: IMemberValue = data?.find((entity: IMemberValue) => {
          return entity.question === question.id;
        });

        return {
          title: question?.title,
          type: question?.type,
          value: element?.value
        };
      })
      ?.slice(0, 5);
  });

  return <QuestionBox className="mb-md" items={items} />;
};

const ApplicantsCard: React.FC = () => {
  return (
    <Card>
      <ApplicantsCardHeader />
      <ApplicantsCardItems />
      <ApplicantsCardActionContainer />
    </Card>
  );
};

export default ApplicantsCard;
