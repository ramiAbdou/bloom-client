import React from 'react';

import { ModalType } from '@constants';
import Row from '@containers/Row/Row';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import Modal from '@organisms/Modal/Modal';
import ModalContentContainer from '@organisms/Modal/ModalContentContainer';
import { IMember, IMemberData, IQuestion, IUser } from '@store/Db/entities';
import IdStore from '@store/Id.store';
import { useStoreState } from '@store/Store';
import ApplicantsRespondButton from './ApplicantsRespondButton';

const ApplicantsModalTitle: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const fullName = useStoreState(({ db }) => {
    const { byId: byMemberId } = db.entities.members;
    const { byId: byUserId } = db.entities.users;

    const member: IMember = byMemberId[memberId];
    const user: IUser = byUserId[member?.user];
    return `${user?.firstName} ${user?.lastName}`;
  });

  return <h1>{fullName}</h1>;
};

const ApplicantsModalItems: React.FC = () => {
  const memberId: string = IdStore.useStoreState(({ id }) => id);

  const items: QuestionValueItemProps[] = useStoreState(({ db }) => {
    const { byId: byDataId } = db.entities.data;
    const { byId: byMemberId } = db.entities.members;
    const { byId: byQuestionId } = db.entities.questions;

    const member: IMember = byMemberId[memberId];

    return member?.data?.map((dataId: string) => {
      const data: IMemberData = byDataId[dataId];
      const { title, type }: IQuestion = byQuestionId[data?.question];
      return { title, type, value: data.value };
    });
  });

  return (
    <ModalContentContainer>
      <QuestionValueList items={items} />
    </ModalContentContainer>
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
