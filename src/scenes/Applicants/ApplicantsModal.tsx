import React from 'react';

import Row from '@containers/Row/Row';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import { IMember, IMemberData, IQuestion, IUser } from '@store/Db/entities';
import { useStoreState } from '@store/Store';
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

  const items: QuestionValueItemProps[] = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];

    const data: IMemberData[] = member.data?.map(
      (dataId: string) => db.byDataId[dataId]
    );

    return db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.filter((question: IQuestion) => {
        return !question?.category || question?.category === 'EMAIL';
      })
      ?.map((question: IQuestion) => {
        const element: IMemberData = data?.find((entity: IMemberData) => {
          return entity.question === question.id;
        });

        return {
          title: question?.title,
          type: question?.type,
          value: element?.value
        };
      });
  });

  return (
    <section className="c-modal-content-ctr">
      <QuestionValueList items={items} />
    </section>
  );
};

const ApplicantsModalActionContainer: React.FC = () => {
  const memberId: string = useStoreState(({ modal }) => modal.metadata);

  return (
    <Row equal spacing="xs">
      <ApplicantsRespondButton applicantIds={[memberId]} response="ACCEPTED" />
      <ApplicantsRespondButton applicantIds={[memberId]} response="REJECTED" />
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
