import { ActionCreator } from 'easy-peasy';
import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import { ICommunity, IMember, IMemberValue } from '@db/db.entities';
import useFind from '@gql/hooks/useFind';
import useFindFull from '@gql/hooks/useFindFull';
import useFindOne from '@gql/hooks/useFindOne';
import QuestionBox from '@molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@molecules/QuestionBox/QuestionBox.types';
import { ModalData } from '@organisms/Modal/Modal.types';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType, QuestionCategory } from '@util/constants';
import ProfileCardHeader from './ProfileCardHeader';

const ProfileMembershipHeader: React.FC = () => {
  const communityId: string = useStoreState(({ db }) => db.communityId);

  const { name } = useFindOne(ICommunity, {
    fields: ['name'],
    where: { id: communityId }
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({ id: ModalType.EDIT_MEMBERSHIP_INFORMATION });
  };

  return (
    <ProfileCardHeader
      canEdit
      title={`${name} Membership Information`}
      onEditClick={onClick}
    />
  );
};

const ProfileMembershipContent: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const memberValues: IMemberValue[] = useFind(IMemberValue, {
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
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { memberValues } = useFindOne(IMember, {
    fields: ['memberValues.id'],
    where: { memberId }
  });

  const showModal: ActionCreator<ModalData> = useStoreActions(
    ({ modal }) => modal.showModal
  );

  const onClick = (): void => {
    showModal({ id: ModalType.EDIT_MEMBERSHIP_INFORMATION });
  };

  return (
    <Button fill primary show={!!memberValues} onClick={onClick}>
      + Fill Out Membership Information
    </Button>
  );
};

const ProfileMembershipCard: React.FC = () => {
  const memberId: string = useStoreState(({ db }) => db.memberId);

  const { loading } = useFindFull(IMemberValue, {
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
