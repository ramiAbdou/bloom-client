import React from 'react';
import { communityIdVar, memberIdVar } from 'src/App.reactive';

import { gql, useReactiveVar } from '@apollo/client';
import Card from '@components/containers/Card/Card';
import QuestionBox from '@components/molecules/QuestionBox/QuestionBox';
import { QuestionBoxItemProps } from '@components/molecules/QuestionBox/QuestionBox.types';
import useFindOne from '@core/gql/hooks/useFindOne';
import { modalVar } from '@core/state/Modal.reactive';
import useFind from '@gql/hooks/useFind';
import {
  ComponentWithFragments,
  ModalType,
  QuestionCategory
} from '@util/constants';
import { ICommunity, IMember, IMemberValue } from '@util/constants.entities';
import ProfileCardHeader from './ProfileCardHeader';
import ProfileMembershipOnboardingButton from './ProfileMembershipOnboardingButton';

const ProfileMembershipHeader: React.FC = () => {
  const communityId: string = useReactiveVar(communityIdVar);

  const { data: community, loading } = useFindOne(ICommunity, {
    fields: ['name'],
    where: { id: communityId }
  });

  if (loading) return null;

  const onClick = (): void => {
    modalVar({ id: ModalType.EDIT_MEMBERSHIP_INFORMATION });
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

const ProfileMembershipCard: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const memberId: string = useReactiveVar(memberIdVar);

  const { loading } = useFind(IMemberValue, {
    fields: ['id', 'member.id', 'question.id', 'value'],
    where: { memberId }
  });

  return (
    <Card className="s-profile-card--membership" show={!loading}>
      {/* <ProfileMembershipHeader />
      <ProfileMembershipContent /> */}
      <ProfileMembershipOnboardingButton data={member} />
    </Card>
  );
};

ProfileMembershipCard.fragment = gql`
  fragment ProfileMembershipCardFragment on members {
    ...ProfileMembershipOnboardingButtonFragment
  }
  ${ProfileMembershipOnboardingButton.fragment}
`;

export default ProfileMembershipCard;
