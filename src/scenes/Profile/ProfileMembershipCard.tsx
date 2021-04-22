import { ActionCreator } from 'easy-peasy';
import React from 'react';
import { communityIdVar, memberIdVar } from 'src/App.reactive';

import { useReactiveVar } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import Card from '@components/containers/Card/Card';
import QuestionBox from '@components/molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@components/molecules/QuestionBox/QuestionBox.types';
import { ModalData } from '@components/organisms/Modal/Modal.types';
import useFindOne from '@core/gql/hooks/useFindOne';
import { useStoreActions } from '@core/store/Store';
import useFind from '@gql/hooks/useFind';
import { ModalType, QuestionCategory } from '@util/constants';
import { ICommunity, IMember, IMemberValue } from '@util/constants.entities';
import ProfileCardHeader from './ProfileCardHeader';

const ProfileMembershipHeader: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const { data: community, loading } = useFindOne(ICommunity, {
    fields: ['name'],
    where: { id: communityId }
  });

  if (loading) return null;

  const onClick = (): void => {
    showModal({ id: ModalType.EDIT_MEMBERSHIP_INFORMATION });
  };

  return (
    <ProfileCardHeader
      canEdit
      title={`${community.name} Membership Information`}
      onEditClick={onClick}
    />
  );
};

const ProfileMembershipContent: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const { data: memberValues, loading } = useFind(IMemberValue, {
    fields: [
      'id',
      'question.category',
      'question.id',
      'question.rank',
      'question.title',
      'question.type',
      'value'
    ],
    where: { memberId }
  });

  if (loading) return null;

  const items: QuestionBoxItemProps[] = memberValues
    ?.filter(
      (memberValue: IMemberValue) =>
        !memberValue.question.category ||
        memberValue.question.category === QuestionCategory.GENDER
    )
    ?.sort((a: IMemberValue, b: IMemberValue) => {
      if (a.question.rank < b.question.rank) return -1;
      if (a.question.rank > b.question.rank) return 1;
      return 0;
    })
    ?.map((memberValue: IMemberValue) => {
      return {
        title: memberValue.question.title,
        type: memberValue.question.type,
        value: memberValue.value
      };
    });

  return <QuestionBox handleNull="HIDE_VALUE" items={items} />;
};

const ProfileMembershipOnboardingContainer: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const { data: member, loading } = useFindOne(IMember, {
    fields: ['memberValues.id'],
    where: { id: memberId }
  });

  if (loading) return null;

  const onClick = (): void => {
    showModal({ id: ModalType.EDIT_MEMBERSHIP_INFORMATION });
  };

  return (
    <Button fill primary show={!!member.memberValues} onClick={onClick}>
      + Fill Out Membership Information
    </Button>
  );
};

const ProfileMembershipCard: React.FC = () => {
  const memberId: string = useReactiveVar(memberIdVar);

  const { loading } = useFind(IMemberValue, {
    fields: ['id', 'member.id', 'question.id', 'value'],
    where: { memberId }
  });

  return (
    <Card className="s-profile-card--membership" show={!loading}>
      <ProfileMembershipHeader />
      <ProfileMembershipContent />
      <ProfileMembershipOnboardingContainer />
    </Card>
  );
};

export default ProfileMembershipCard;
