import React from 'react';

import Button from '@atoms/Button/Button';
import Card from '@containers/Card/Card';
import QuestionBox from '@molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@molecules/QuestionBox/QuestionBox.types';
import { IMemberValue, IQuestion } from '@store/Db/entities';
import { useStoreActions, useStoreState } from '@store/Store';
import { ModalType } from '@util/constants';
import { sortObjects } from '@util/util';
import ProfileCardHeader from './ProfileCardHeader';
import useInitProfileMembership from './useInitProfileMembership';

const ProfileMembershipHeader: React.FC = () => {
  const title: string = useStoreState(({ db }) => {
    return `${db.community.name} Membership Information`;
  });

  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({ id: ModalType.EDIT_MEMBERSHIP_INFORMATION });
  };

  return <ProfileCardHeader canEdit title={title} onEditClick={onClick} />;
};

const ProfileMembershipContent: React.FC = () => {
  const items: QuestionBoxItemProps[] = useStoreState(({ db }) => {
    const sortedQuestions: IQuestion[] = db.community.questions
      ?.map((questionId: string) => db.byQuestionId[questionId])
      ?.filter((question: IQuestion) => !question.category)
      ?.sort((a, b) => sortObjects(a, b, 'rank', 'ASC'));

    const values: IMemberValue[] = db.member.values?.map(
      (valueId: string) => db.byValuesId[valueId]
    );

    return sortedQuestions?.map(({ id, title, type }: IQuestion) => {
      const value: any = values?.find(
        (entity: IMemberValue) => entity?.question === id
      )?.value;

      return { title, type, value };
    });
  });

  return <QuestionBox handleNull="HIDE_VALUE" items={items} />;
};

const ProfileMembershipOnboardingContainer: React.FC = () => {
  const hasData: boolean = useStoreState(({ db }) => !!db.member.values);
  const showModal = useStoreActions(({ modal }) => modal.showModal);

  const onClick = () => {
    showModal({ id: ModalType.EDIT_MEMBERSHIP_INFORMATION });
  };

  return (
    <Button fill primary show={!hasData} onClick={onClick}>
      + Fill Out Membership Information
    </Button>
  );
};

const ProfileMembershipCard: React.FC = () => {
  const { loading } = useInitProfileMembership();

  return (
    <Card className="s-profile-card--membership" show={!loading}>
      <ProfileMembershipHeader />
      <ProfileMembershipContent />
      <ProfileMembershipOnboardingContainer />
    </Card>
  );
};

export default ProfileMembershipCard;
