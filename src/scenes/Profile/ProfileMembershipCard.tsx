import React from 'react';

import Button from '@atoms/Button/Button';
import { ModalType } from '@constants';
import Card from '@containers/Card/Card';
import useQuery from '@hooks/useQuery';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import { IMemberData, IQuestion } from '@store/entities';
import { Schema } from '@store/schema';
import { useStoreActions, useStoreState } from '@store/Store';
import { GET_MEMBER_DATA } from './Profile.gql';
import ProfileCardHeader from './ProfileCardHeader';

const ProfileMembershipHeader: React.FC = () => {
  const title = useStoreState(({ db }) => {
    return `${db.community.name} Membership Information`;
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);
  const onClick = () => showModal(ModalType.EDIT_MEMBERSHIP_INFORMATION);

  return <ProfileCardHeader canEdit title={title} onEditClick={onClick} />;
};

const ProfileMembershipContent: React.FC = () => {
  const items: QuestionValueItemProps[] = useStoreState(({ db }) => {
    const { byId: byDataId } = db.entities.data;
    const { byId: byQuestionId } = db.entities.questions;

    const questions: IQuestion[] = db.community.questions
      ?.map((questionId: string) => byQuestionId[questionId])
      .filter((question: IQuestion) => !question.onlyInApplication)
      .filter((question: IQuestion) => !question.category);

    return questions?.map(({ id, title, type }: IQuestion) => {
      const data: IMemberData = Object.values(byDataId).find(
        (element: IMemberData) => element.question === id
      );

      return { title, type, value: data?.value };
    });
  });

  return <QuestionValueList handleNull="HIDE_VALUE" items={items} />;
};

const ProfileMembershipOnboardingContainer: React.FC = () => {
  const hasData = useStoreState(({ db }) => !!db.member.data?.length);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  if (hasData) return null;

  const onClick = () => showModal(ModalType.EDIT_MEMBERSHIP_INFORMATION);

  return (
    <Button fill primary onClick={onClick}>
      + Fill Out Membership Information
    </Button>
  );
};

const ProfileMembershipCard: React.FC = () => {
  const { loading } = useQuery({
    name: 'getMember',
    query: GET_MEMBER_DATA,
    schema: Schema.MEMBER,
    variables: { populate: ['community.questions', 'data.question'] }
  });

  if (loading) return null;

  return (
    <Card className="s-profile-card--membership">
      <ProfileMembershipHeader />
      <ProfileMembershipContent />
      <ProfileMembershipOnboardingContainer />
    </Card>
  );
};

export default ProfileMembershipCard;
