import day from 'dayjs';
import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import { IMember, IMemberData, IQuestion, IUser } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreActions, useStoreState } from '@store/Store';
import ApplicantsModal from './ApplicantsModal';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsCardHeader: React.FC = () => {
  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const createdAt: string = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    const member: IMember = byMemberId[memberId];
    return day(member?.createdAt).format('M/D/YY');
  });

  const fullName: string = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    const { byId: byUserId } = db.entities.users;

    const member: IMember = byMemberId[memberId];
    const user: IUser = byUserId[member?.user];
    return `${user?.firstName} ${user?.lastName}`;
  });

  const onClick = () => showModal(`${ModalType.APPLICANT}-${memberId}`);

  return (
    <Row spaceBetween marginBottom={24}>
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
    <Row equal marginTopAuto>
      <ApplicantsRespondButton applicantIds={[memberId]} response="ACCEPTED" />
      <ApplicantsRespondButton applicantIds={[memberId]} response="REJECTED" />
    </Row>
  );
};

const ApplicantsCardItems: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const items: QuestionValueItemProps[] = useStoreState(({ db }) => {
    const { byId: byDataId } = db.entities.data;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byQuestionId } = db.entities.questions;

    const member: IMember = byMemberId[memberId];

    return member?.data
      ?.filter((dataId: string) => {
        const data: IMemberData = byDataId[dataId];
        const question: IQuestion = byQuestionId[data?.question];
        return question?.inApplicantCard;
      })
      ?.map((dataId: string) => {
        const data: IMemberData = byDataId[dataId];
        const { title, type }: IQuestion = byQuestionId[data?.question];
        return { title, type, value: data.value };
      });
  });

  return <QuestionValueList items={items} marginBottom={24} />;
};

const ApplicantsCard: React.FC = () => {
  return (
    <Card>
      <ApplicantsCardHeader />
      <ApplicantsCardItems />
      <ApplicantsCardActionContainer />
      <ApplicantsModal />
    </Card>
  );
};

export default ApplicantsCard;
