import React from 'react';

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

    const memberData: IMemberData[] = db.member.data?.map((dataId: string) => {
      return byDataId[dataId];
    });

    return memberData
      ?.filter(({ question }) => !byQuestionId[question]?.onlyInApplication)
      .map(({ question: questionId, value }: IMemberData) => {
        const { title, type }: IQuestion = byQuestionId[questionId];
        return { title, type, value };
      });
  });

  return <QuestionValueList items={items} />;
};

const ProfileMembershipCard: React.FC = () => {
  useQuery({
    name: 'getMember',
    query: GET_MEMBER_DATA,
    schema: Schema.MEMBER,
    variables: { populate: ['data.question'] }
  });

  return (
    <Card className="s-profile-card--membership">
      <ProfileMembershipHeader />
      <ProfileMembershipContent />
    </Card>
  );
};

export default ProfileMembershipCard;
