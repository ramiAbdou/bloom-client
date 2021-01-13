import React from 'react';

import Card from '@containers/Card/Card';
import QuestionValueList, {
  QuestionValueItemProps
} from '@molecules/QuestionValueList';
import { useStoreState } from '@store/Store';
import ProfileCardHeader from './ProfileCardHeader';

const ProfileMembershipHeader: React.FC = () => {
  const title = useStoreState(({ db }) => {
    return `${db.community.name} Membership Information`;
  });

  return <ProfileCardHeader canEdit title={title} />;
};

const ProfileMembershipContent: React.FC = () => {
  const items: QuestionValueItemProps[] = [
    { title: 'Race', type: 'MULTIPLE_CHOICE', value: 'Black/African American' },
    {
      title: 'Graduation Year',
      type: 'MULTIPLE_CHOICE',
      value: 'Class of 2024'
    },
    { title: 'Major', type: 'MULTIPLE_CHOICE', value: 'Computer Science' }
  ];

  return <QuestionValueList items={items} />;
};

const ProfileMembershipCard: React.FC = () => {
  return (
    <Card className="s-profile-card--membership">
      <ProfileMembershipHeader />
      <ProfileMembershipContent />
    </Card>
  );
};

export default ProfileMembershipCard;
