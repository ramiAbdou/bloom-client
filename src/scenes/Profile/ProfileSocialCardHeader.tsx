import React from 'react';

import { gql } from '@apollo/client';
import { modalVar } from '@core/state/Modal.reactive';
import { ComponentWithFragments, ModalType } from '@util/constants';
import { IMemberSocials } from '@util/constants.entities';
import ProfileCardHeader from './ProfileCardHeader';

const ProfileSocialCardHeader: ComponentWithFragments<IMemberSocials> = ({
  data: memberSocials
}) => {
  const isSocialLinked: boolean =
    !!memberSocials.facebookUrl ||
    !!memberSocials.instagramUrl ||
    !!memberSocials.linkedInUrl ||
    !!memberSocials.twitterUrl;

  const onClick = (): void => {
    modalVar({ id: ModalType.UPDATE_SOCIAL_INFORMATION });
  };

  return (
    <ProfileCardHeader
      canEdit={isSocialLinked}
      title="Social Media"
      onEditClick={onClick}
    />
  );
};

ProfileSocialCardHeader.fragment = gql`
  fragment ProfileSocialCardHeaderFragment on members {
    memberSocials {
      facebookUrl
      instagramUrl
      linkedInUrl
      twitterUrl
    }
  }
`;

export default ProfileSocialCardHeader;
