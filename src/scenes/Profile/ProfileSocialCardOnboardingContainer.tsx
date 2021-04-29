import React from 'react';

import { gql } from '@apollo/client';
import Button from '@components/atoms/Button/Button';
import { showModal } from '@components/organisms/Modal/Modal.state';
import { ModalType } from '@components/organisms/Modal/Modal.types';
import { ComponentWithFragments } from '@util/constants';
import { IMember } from '@util/constants.entities';

const ProfileSocialCardOnboardingContainer: ComponentWithFragments<IMember> = ({
  data: member
}) => {
  const isSocialLinked: boolean =
    !!member.memberSocials.facebookUrl ||
    !!member.memberSocials.instagramUrl ||
    !!member.memberSocials.linkedInUrl ||
    !!member.memberSocials.twitterUrl;

  if (isSocialLinked) return null;

  const onClick = (): void => {
    showModal({ id: ModalType.UPDATE_SOCIAL_INFORMATION });
  };

  return (
    <>
      <p className="mb-sm--nlc">
        Strengthen your relationships with other community members by adding
        your social profiles!
      </p>

      <Button primary onClick={onClick}>
        + Link Social Media
      </Button>
    </>
  );
};

ProfileSocialCardOnboardingContainer.fragment = gql`
  fragment ProfileSocialCardOnboardingContainerFragment on members {
    memberSocials {
      facebookUrl
      instagramUrl
      linkedInUrl
      twitterUrl
    }
  }
`;

export default ProfileSocialCardOnboardingContainer;
