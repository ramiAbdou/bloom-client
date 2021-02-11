import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import useQuery from '@hooks/useQuery';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import { GET_MEMBER_DATA } from '@store/Db/Db.gql';
import { IMemberData, IQuestion } from '@store/Db/entities';
import { Schema } from '@store/Db/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { sortObjects } from '@util/util';
import ProfileCardHeader from './ProfileCardHeader';

const ProfileMembershipHeader: React.FC = () => {
  const title = useStoreState(({ db }) => {
    return `${db.community.name} Membership Information`;
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () =>
    showModal({ id: ModalType.EDIT_MEMBERSHIP_INFORMATION });

  return <ProfileCardHeader canEdit title={title} onEditClick={onClick} />;
};

const ProfileMembershipContent: React.FC = () => {
  const items: QuestionValueItemProps[] = useStoreState(({ db }) => {
    const questions: IQuestion[] = db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.filter((question: IQuestion) => !question.onlyInApplication)
      ?.filter((question: IQuestion) => !question.category)
      ?.sort((a, b) => sortObjects(a, b, 'createdAt', 'ASC'));

    const data: IMemberData[] = db.member.data?.map(
      (dataId: string) => db.byDataId[dataId]
    );

    return questions?.map(({ id, title, type }: IQuestion) => {
      const value: any = data?.find(
        (entity: IMemberData) => entity?.question === id
      )?.value;

      return { title, type, value };
    });
  });

  return <QuestionValueList handleNull="HIDE_VALUE" items={items} />;
};

const ProfileMembershipOnboardingContainer: React.FC = () => {
  const hasData: boolean = useStoreState(({ db }) => !!db.member.data);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () =>
    showModal({ id: ModalType.EDIT_MEMBERSHIP_INFORMATION });

  return (
    <Button fill primary show={!hasData} onClick={onClick}>
      + Fill Out Membership Information
    </Button>
  );
};

const ProfileMembershipCard: React.FC = () => {
  const { loading: loading1 } = useQuery<IMemberData[]>({
    operation: 'getMemberData',
    query: GET_MEMBER_DATA,
    schema: [Schema.MEMBER_DATA]
  });

  const { loading: loading2 } = useQuery<IQuestion[]>({
    fields: ['id', 'description', 'onlyInApplication', 'required', 'type'],
    operation: 'getQuestions',
    schema: [Schema.QUESTION]
  });

  const loading = loading1 && loading2;

  return (
    <Card className="s-profile-card--membership" show={!loading}>
      <ProfileMembershipHeader />
      <ProfileMembershipContent />
      <ProfileMembershipOnboardingContainer />
    </Card>
  );
};

export default ProfileMembershipCard;
