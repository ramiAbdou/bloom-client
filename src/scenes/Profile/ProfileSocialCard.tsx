import React from 'react';

import { HeaderTag } from '@atoms/Tags';
import Card from '@containers/Card/Card';
import Row from '@containers/Row/Row';
import ProfileCardHeader from './ProfileCardHeader';

const ProfileSocialCard: React.FC = () => {
  return (
    <Card className="s-profile-card--social">
      <ProfileCardHeader canEdit title="Social Media" />

      <Row>
        <HeaderTag />
      </Row>
    </Card>
  );
};

export default ProfileSocialCard;
