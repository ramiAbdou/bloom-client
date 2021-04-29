import React from 'react';

import { gql } from '@apollo/client';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@components/organisms/Modal/Modal.types';
import { ComponentWithFragments } from '@util/constants';
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
    showModal({ id: ModalType.UPDATE_SOCIAL_INFORMATION });
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
