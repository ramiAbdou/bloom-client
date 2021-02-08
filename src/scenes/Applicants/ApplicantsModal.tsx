import React from 'react';

import { ModalType } from '@constants';
import Row from '@containers/Row/Row';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import Modal from '@organisms/Modal/Modal';
import { IMember, IMemberData, IQuestion, IUser } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsModalTitle: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const fullName = useStoreState(({ db }) => {
    const member: IMember = db.byMemberId[memberId];
    const user: IUser = db.byUserId[member?.user];
    return `${user?.firstName} ${user?.lastName}`;
  });

  return <h1>{fullName}</h1>;
};

const ApplicantsModalItems: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

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
  const memberId = IdStore.useStoreState(({ id }) => id);

  return (
    <Row equal>
      <ApplicantsRespondButton applicantIds={[memberId]} response="ACCEPTED" />
      <ApplicantsRespondButton applicantIds={[memberId]} response="REJECTED" />
    </Row>
  );
};

const ApplicantsModal: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  return (
    <Modal id={`${ModalType.APPLICANT}-${memberId}`}>
      <ApplicantsModalTitle />
      <ApplicantsModalItems />
      <ApplicantsModalActionContainer />
    </Modal>
  );
};

export default ApplicantsModal;
